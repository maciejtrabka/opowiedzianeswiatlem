import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { LeadInsert } from "../types/leads";

const subjects = [
  { value: "", label: "Wybierz temat" },
  { value: "slub", label: "Ślub / reportaż" },
  { value: "narzeczenska", label: "Sesja narzeczeńska" },
  { value: "rodzinna", label: "Sesja rodzinna" },
  { value: "inne", label: "Inne" },
] as const;

const sources = [
  { value: "", label: "Skąd o mnie wiesz?" },
  { value: "instagram", label: "Z Instagrama" },
  { value: "polecenie", label: "Polecenie znajomych" },
  { value: "google", label: "Wyszukiwarka internetowa" },
  { value: "inne", label: "Inne" },
] as const;

type FormState = {
  name: string;
  email: string;
  subject: string;
  event_date: string;
  location: string;
  message: string;
  source: string;
};

const initial: FormState = {
  name: "",
  email: "",
  subject: "",
  event_date: "",
  location: "",
  message: "",
  source: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("loading");

    const payload: LeadInsert = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject || null,
      event_date: form.event_date || null,
      location: form.location.trim() || null,
      message: form.message.trim() || null,
      source: form.source || null,
    };

    const { error: insertError } = await supabase.from("leads").insert(payload);

    if (insertError) {
      setStatus("error");
      setError(
        insertError.message ||
          "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na e-mail.",
      );
      return;
    }

    setStatus("success");
    setForm(initial);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center rounded-sm border border-accent/40 bg-section/50 py-16 text-center"
          >
            <CheckCircle2 className="h-14 w-14 text-accent" aria-hidden />
            <p className="mt-4 font-serif text-2xl text-ink">Dziękujemy!</p>
            <p className="mt-2 max-w-sm text-sm text-ink/75">
              Wiadomość została wysłana. Odpiszemy tak szybko, jak to możliwe.
            </p>
            <button
              type="button"
              className="mt-8 text-sm text-accent underline underline-offset-4 hover:text-ink"
              onClick={() => setStatus("idle")}
            >
              Wyślij kolejną wiadomość
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                  Imię i nazwisko
                </span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full border border-section bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                  Adres e-mail
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full border border-section bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent"
                  autoComplete="email"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                Temat
              </span>
              <select
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="w-full border border-section bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent"
              >
                {subjects.map((s) => (
                  <option key={s.value || "empty"} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                  Data wydarzenia
                </span>
                <input
                  type="date"
                  name="event_date"
                  value={form.event_date}
                  onChange={onChange}
                  className="w-full border border-section bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                  Lokalizacja
                </span>
                <input
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  placeholder="Miasto / miejsce"
                  className="w-full border border-section bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent placeholder:text-ink/40"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                Wiadomość
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                className="w-full resize-y border border-section bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent"
                placeholder="Opowiedz krótko o swoich planach..."
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                Skąd o mnie wiesz?
              </span>
              <select
                name="source"
                value={form.source}
                onChange={onChange}
                className="w-full border border-section bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent"
              >
                {sources.map((s) => (
                  <option key={s.value || "empty-src"} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            {status === "error" && error && (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex w-full items-center justify-center gap-2 border border-accent bg-accent py-3.5 font-sans text-sm font-medium tracking-wide text-cream transition hover:bg-ink hover:border-ink disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Wysyłanie…
                </>
              ) : (
                "Wyślij wiadomość"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
