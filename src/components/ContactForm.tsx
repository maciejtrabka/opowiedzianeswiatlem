import { useState, useRef, useEffect, useId } from "react";
import type { FormEvent, ChangeEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { LeadInsert } from "../types/leads";
import CalendarPicker from "./CalendarPicker";

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

const subjectOptions = subjects.filter((s) => s.value !== "");

function SubjectSelect({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const buttonId = `${id}-trigger`;

  const focusTrigger = () => {
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  const displayLabel =
    subjects.find((s) => s.value === value)?.label ?? subjects[0].label;
  const hasValue = Boolean(value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) {
      const idx = Math.max(
        0,
        subjectOptions.findIndex((s) => s.value === value),
      );
      setHighlight(idx >= 0 ? idx : 0);
    }
  }, [open, value]);

  useEffect(() => {
    if (open) {
      listRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const selectAt = (index: number) => {
    const opt = subjectOptions[index];
    if (opt) onChange(opt.value);
    setOpen(false);
    focusTrigger();
  };

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      focusTrigger();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % subjectOptions.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + subjectOptions.length) % subjectOptions.length);
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectAt(highlight);
    }
    if (e.key === "Home") {
      e.preventDefault();
      setHighlight(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setHighlight(subjectOptions.length - 1);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id={buttonId}
        className={`flex w-full items-center justify-between gap-3 border bg-cream px-4 py-3 text-left text-ink outline-none transition focus:border-accent ${
          open ? "border-accent" : "border-section"
        } ${hasValue ? "" : "text-ink/50"}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKeyDown}
      >
        <span>{displayLabel}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-accent transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={-1}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto border border-section bg-cream py-1 shadow-lg shadow-ink/10"
            aria-labelledby={buttonId}
            onKeyDown={onListKeyDown}
          >
            {subjectOptions.map((s, i) => (
              <li
                key={s.value}
                role="option"
                aria-selected={value === s.value}
                className={`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-section/50 ${
                  i === highlight ? "bg-section/35" : ""
                } ${value === s.value ? "font-medium text-accent" : "text-ink"}`}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectAt(i);
                }}
              >
                {s.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

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

const SUBMIT_COOLDOWN_MS = 60_000;
let lastSubmitAt = 0;

type FieldErrors = { name?: string; email?: string };

function validateName(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Podaj imię i nazwisko — tak łatwiej się do Ciebie zwrócimy.";
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return "Wpisz imię i nazwisko w dwóch słowach, np. „Anna Kowalska”.";
  }
  return undefined;
}

function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Podaj adres e-mail, żebyśmy mogli odpisać.";
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  if (!ok) {
    return "Ten adres wygląda na niepełny — sprawdź, czy jest @ i domena (np. imie@gmail.com).";
  }
  return undefined;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "name" || name === "email") {
      setFieldErrors((fe) => ({ ...fe, [name]: undefined }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    if (nameErr || emailErr) {
      setFieldErrors({ name: nameErr, email: emailErr });
      setStatus("idle");
      return;
    }
    setFieldErrors({});

    const now = Date.now();
    if (now - lastSubmitAt < SUBMIT_COOLDOWN_MS) {
      setStatus("error");
      setError("Zbyt wiele prób — odczekaj chwilę przed kolejnym wysłaniem.");
      return;
    }

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
      console.error("Lead insert failed:", insertError.message);
      setStatus("error");
      setError(
        "Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na e-mail.",
      );
      return;
    }

    lastSubmitAt = Date.now();
    setStatus("success");
    setForm(initial);
    setFieldErrors({});
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
            noValidate
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                  Imię i nazwisko
                </span>
                <input
                  name="name"
                  id="contact-name"
                  value={form.name}
                  onChange={onChange}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                  className={`w-full border bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent ${
                    fieldErrors.name ? "border-red-600/70" : "border-section"
                  }`}
                  autoComplete="name"
                />
                {fieldErrors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-sm text-red-800" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                  Adres e-mail
                </span>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  value={form.email}
                  onChange={onChange}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                  className={`w-full border bg-cream px-4 py-3 text-ink outline-none transition focus:border-accent ${
                    fieldErrors.email ? "border-red-600/70" : "border-section"
                  }`}
                  autoComplete="email"
                />
                {fieldErrors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-sm text-red-800" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                Temat
              </span>
              <SubjectSelect
                id="contact-subject"
                value={form.subject}
                onChange={(subject) =>
                  setForm((f) => ({ ...f, subject }))
                }
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink/70">
                  Data wydarzenia
                </span>
                <CalendarPicker
                  id="contact-event-date"
                  value={form.event_date}
                  onChange={(event_date) =>
                    setForm((f) => ({ ...f, event_date }))
                  }
                  placeholder="Wybierz datę"
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
