import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Strona główna" },
  { to: "/portfolio", label: "Realizacje" },
  { to: "/about", label: "O mnie" },
  { to: "/offer", label: "Oferta" },
  { to: "/faq", label: "Najczęstsze pytania" },
  { to: "/contact", label: "Kontakt" },
] as const;

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide transition-colors ${
    isActive ? "text-accent" : "text-ink/80 hover:text-accent"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-section/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          to="/"
          className="font-serif text-lg tracking-tight text-ink md:text-xl"
        >
          Opowiedziane Światłem
        </Link>

        <nav
          aria-label="Nawigacja główna"
          className="hidden items-center gap-8 md:flex"
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={desktopLinkClass}
              end={to === "/"}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-ink transition-colors hover:text-accent md:hidden"
          aria-expanded={open}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav
        aria-label="Menu mobilne"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] flex-col border-t border-section/60 bg-cream transition-all duration-300 ease-out md:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 pt-4">
          {links.map(({ to, label }, i) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `block border-b border-section/40 py-4 text-lg tracking-wide transition-all duration-300 ease-out ${
                    isActive
                      ? "font-serif text-accent"
                      : "text-ink/70 active:text-accent"
                  } ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`
                }
                style={{
                  transitionDelay: open ? `${50 + i * 60}ms` : "0ms",
                }}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
