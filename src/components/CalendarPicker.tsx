import { useCallback, useEffect, useId, useRef, useState, type RefCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS_PL = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
] as const;

const WEEKDAYS_PL = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"] as const;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function toIsoDate(y: number, m0: number, day: number): string {
  return `${y}-${pad2(m0 + 1)}-${pad2(day)}`;
}

/** Monday = 0 … Sunday = 6 */
function weekdayMonday0(year: number, month0: number): number {
  const d = new Date(year, month0, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function parseIso(iso: string): { y: number; m0: number; d: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  if (mo < 0 || mo > 11 || d < 1 || d > 31) return null;
  const dt = new Date(y, mo, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== d) return null;
  return { y, m0: mo, d };
}

function formatDisplayPl(iso: string): string {
  const p = parseIso(iso);
  if (!p) return "";
  return `${p.d} ${MONTHS_PL[p.m0]} ${p.y}`;
}

type CalendarPickerProps = {
  id?: string;
  value: string;
  onChange: (isoDate: string) => void;
  placeholder?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export default function CalendarPicker({
  id,
  value,
  onChange,
  placeholder = "Wybierz datę",
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: CalendarPickerProps) {
  const genId = useId();
  const buttonId = id ?? `calendar-${genId}`;
  const gridId = `${buttonId}-grid`;
  const labelId = `${buttonId}-label`;

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dialogContentRef: RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      if (node) {
        const firstFocusable = node.querySelector<HTMLElement>("button");
        firstFocusable?.focus();
      }
    },
    [],
  );

  const initialView = useCallback(() => {
    const p = value ? parseIso(value) : null;
    if (p) return new Date(p.y, p.m0, 1);
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  }, [value]);

  const [view, setView] = useState<Date>(initialView);

  useEffect(() => {
    if (value) {
      const p = parseIso(value);
      if (p) setView(new Date(p.y, p.m0, 1));
    }
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const y = view.getFullYear();
  const m0 = view.getMonth();
  const daysInMonth = new Date(y, m0 + 1, 0).getDate();
  const lead = weekdayMonday0(y, m0);
  const cells: (number | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() && m0 === today.getMonth() && y === today.getFullYear();

  const goMonth = (delta: number) => {
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
  };

  const selectDay = (day: number) => {
    onChange(toIsoDate(y, m0, day));
    setOpen(false);
  };

  const display = value ? formatDisplayPl(value) : "";

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={gridId}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 border border-section bg-cream px-4 py-3 text-left text-ink outline-none transition focus:border-accent"
      >
        <span className={display ? "text-ink" : "text-ink/45"}>
          {display || placeholder}
        </span>
        <CalendarIcon className="h-5 w-5 shrink-0 text-accent" aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogContentRef}
            id={gridId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 z-50 mt-2 border border-section bg-cream p-4 shadow-lg sm:left-auto sm:right-0 sm:min-w-[320px]"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <button
                type="button"
                className="rounded-sm p-1.5 text-ink outline-none transition hover:bg-section focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => goMonth(-1)}
                aria-label="Poprzedni miesiąc"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <p id={labelId} className="font-medium text-ink">
                {MONTHS_PL[m0]} {y}
              </p>
              <button
                type="button"
                className="rounded-sm p-1.5 text-ink outline-none transition hover:bg-section focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => goMonth(1)}
                aria-label="Następny miesiąc"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wider text-ink/55">
              {WEEKDAYS_PL.map((w) => (
                <div key={w} className="py-1">
                  {w}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) =>
                day === null ? (
                  <div key={`e-${i}`} className="aspect-square" />
                ) : (
                  <button
                    key={day}
                    type="button"
                    onClick={() => selectDay(day)}
                    aria-label={`${day} ${MONTHS_PL[m0]} ${y}`}
                    aria-pressed={value === toIsoDate(y, m0, day)}
                    className={`aspect-square text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
                      value === toIsoDate(y, m0, day)
                        ? "bg-accent font-medium text-cream"
                        : isToday(day)
                          ? "border border-accent/60 bg-cream text-ink"
                          : "text-ink hover:bg-section"
                    }`}
                  >
                    {day}
                  </button>
                ),
              )}
            </div>

            {value && (
              <button
                type="button"
                className="mt-4 w-full border border-section py-2 text-xs uppercase tracking-wider text-ink/70 transition hover:border-accent hover:text-ink"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                Wyczyść datę
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
