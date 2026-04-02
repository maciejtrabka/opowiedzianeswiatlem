import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-section bg-section/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-serif text-lg text-ink">Opowiedziane Światłem</p>
          <p className="mt-1 text-sm text-ink/70">Kaja — fotografia ślubna</p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-ink/80">
          <a
            href="mailto:opowiedzianeswiatlem@gmail.com"
            className="inline-flex items-center gap-2 hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            opowiedzianeswiatlem@gmail.com
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-accent"
            aria-label="Profil na Instagramie"
          >
            <Instagram className="h-4 w-4" />
            Profil na Instagramie
          </a>
          <Link to="/contact" className="hover:text-accent">
            Kontakt
          </Link>
        </div>
        <p className="text-xs text-ink/50">
          © {new Date().getFullYear()} Kaja. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
