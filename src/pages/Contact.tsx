import { Instagram, Mail, Phone } from "lucide-react";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-section bg-section/40 py-16 text-center md:py-20">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">Kontakt</h1>
        <p className="mx-auto mt-4 max-w-lg text-ink/75">
          Porozmawiajmy o Waszym dniu lub sesji.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-2 md:gap-16 md:px-6 md:py-20">
        <div>
          <h2 className="font-serif text-2xl text-ink">Kaja</h2>
          <p className="mt-2 text-ink/75">Opowiedziane Światłem</p>

          <ul className="mt-10 space-y-6 text-ink/90">
            <li>
              <a
                href="tel:+48782328451"
                className="inline-flex items-center gap-3 hover:text-accent"
              >
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span>782 328 451</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:opowiedzianeswiatlem@gmail.com"
                className="inline-flex items-center gap-3 break-all hover:text-accent"
              >
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                opowiedzianeswiatlem@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:text-accent"
                aria-label="Profil na Instagramie"
              >
                <Instagram className="h-5 w-5 shrink-0 text-accent" />
                Profil na Instagramie
              </a>
            </li>
          </ul>

          <p className="mt-12 text-sm leading-relaxed text-ink/65">
            Odpowiadam zwykle w ciągu 1–2 dni roboczych. W sezonie ślubnym
            proszę o chwilę cierpliwości — każda wiadomość jest dla mnie ważna.
          </p>
        </div>

        <div className="border border-section bg-section/30 p-6 md:p-8">
          <h3 className="font-serif text-xl text-ink">Formularz</h3>
          <p className="mt-2 text-sm text-ink/70">
            Wypełnij pola — oddzwonię lub odpiszę mailowo.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
