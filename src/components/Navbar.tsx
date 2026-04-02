import { useState } from "react";
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

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm tracking-wide transition-colors ${
    isActive ? "text-accent" : "text-ink/80 hover:text-accent"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-section/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          to="/"
          className="font-serif text-lg tracking-tight text-ink md:text-xl"
        >
          Opowiedziane Światłem
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-section bg-cream px-4 py-4 md:hidden">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
