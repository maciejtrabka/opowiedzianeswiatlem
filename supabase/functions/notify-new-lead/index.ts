/**
 * Sends an email when a row is inserted into public.leads.
 *
 * Setup:
 * 1. Resend: https://resend.com — create API key; for testing you can use from "onboarding@resend.dev"
 *    (sends only to your Resend account email until you verify a domain).
 * 2. supabase secrets set RESEND_API_KEY=re_... WEBHOOK_SECRET=<long-random> LEAD_NOTIFY_EMAIL=mactrabka@gmail.com
 * 3. supabase functions deploy notify-new-lead
 * 4. Dashboard → Database → Webhooks → New: public.leads, Insert → POST
 *    https://<project-ref>.supabase.co/functions/v1/notify-new-lead
 *    Header: Authorization: Bearer <WEBHOOK_SECRET>
 */

const RESEND_API = "https://api.resend.com/emails";

type DbWebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: Record<string, unknown> | null;
};

function esc(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "GET" || req.method === "HEAD") {
    return new Response("notify-new-lead", { status: 200 });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const secret = Deno.env.get("WEBHOOK_SECRET");
  const auth = req.headers.get("Authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const notifyTo = Deno.env.get("LEAD_NOTIFY_EMAIL")?.trim() || "mactrabka@gmail.com";
  const from =
    Deno.env.get("RESEND_FROM_EMAIL")?.trim() || "onboarding@resend.dev";

  if (!resendKey) {
    console.error("Missing RESEND_API_KEY");
    return new Response("Server misconfigured", { status: 500 });
  }

  let body: DbWebhookPayload;
  try {
    body = (await req.json()) as DbWebhookPayload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const evt = String(body.type ?? "").toUpperCase();
  const schema = String(body.schema ?? "").toLowerCase();
  const table = String(body.table ?? "").toLowerCase();

  if (
    evt !== "INSERT" ||
    schema !== "public" ||
    table !== "leads" ||
    !body.record ||
    typeof body.record !== "object"
  ) {
    console.warn("notify-new-lead ignored payload:", { evt, schema, table, hasRecord: !!body.record });
    return new Response("Ignored", { status: 200 });
  }

  const r = body.record;
  const name = String(r.name ?? "");
  const email = String(r.email ?? "");
  const subject = r.subject != null ? String(r.subject) : "";
  const eventDate = r.event_date != null ? String(r.event_date) : "";
  const location = r.location != null ? String(r.location) : "";
  const message = r.message != null ? String(r.message) : "";
  const source = r.source != null ? String(r.source) : "";
  const id = r.id != null ? String(r.id) : "";
  const createdAt = r.created_at != null ? String(r.created_at) : "";

  const lines = [
    `Nowe zapytanie z formularza`,
    ``,
    `Imię i nazwisko: ${name}`,
    `E-mail: ${email}`,
    subject && `Temat: ${subject}`,
    eventDate && `Data wydarzenia: ${eventDate}`,
    location && `Lokalizacja: ${location}`,
    source && `Skąd: ${source}`,
    message && `Wiadomość:\n${message}`,
    ``,
    id && `ID: ${id}`,
    createdAt && `Utworzono: ${createdAt}`,
  ].filter(Boolean) as string[];

  const text = lines.join("\n");
  const html = `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${esc(
    text,
  )}</pre>`;

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [notifyTo],
      subject: `Nowe zapytanie: ${name || email || "formularz"}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend error:", res.status, errText);
    return new Response("Upstream email error", { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
