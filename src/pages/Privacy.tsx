import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  useEffect(() => {
    document.title = "Polityka prywatności — Opowiedziane Światłem";
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-section bg-section/40 py-16 text-center md:py-20">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">
          Polityka prywatności
        </h1>
      </header>

      <article className="prose-ink mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-ink [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-ink/85 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-sm [&_ul]:leading-relaxed [&_ul]:text-ink/85">
        <h2>1. Administrator danych</h2>
        <p>
          Administratorem Twoich danych osobowych jest Kaja — Opowiedziane
          Światłem, kontakt:{" "}
          <a href="mailto:opowiedzianeswiatlem@gmail.com" className="text-accent underline">
            opowiedzianeswiatlem@gmail.com
          </a>.
        </p>

        <h2>2. Jakie dane zbieramy</h2>
        <p>Poprzez formularz kontaktowy zbieramy:</p>
        <ul>
          <li>Imię i nazwisko</li>
          <li>Adres e-mail</li>
          <li>Temat zapytania</li>
          <li>Datę i lokalizację wydarzenia (opcjonalnie)</li>
          <li>Treść wiadomości</li>
          <li>Informację o źródle polecenia</li>
        </ul>

        <h2>3. Cel przetwarzania</h2>
        <p>
          Dane przetwarzamy wyłącznie w celu odpowiedzi na Twoje zapytanie,
          przygotowania oferty i ewentualnej realizacji usługi fotograficznej
          (art. 6 ust. 1 lit. b i f RODO).
        </p>

        <h2>4. Okres przechowywania</h2>
        <p>
          Dane przechowujemy przez okres niezbędny do realizacji celu, nie
          dłużej niż 2 lata od ostatniego kontaktu, chyba że prawo wymaga
          dłuższego przechowywania.
        </p>

        <h2>5. Twoje prawa</h2>
        <p>Przysługuje Ci prawo do:</p>
        <ul>
          <li>Dostępu do swoich danych</li>
          <li>Sprostowania danych</li>
          <li>Usunięcia danych („prawo do bycia zapomnianym")</li>
          <li>Ograniczenia przetwarzania</li>
          <li>Przenoszenia danych</li>
          <li>Sprzeciwu wobec przetwarzania</li>
        </ul>
        <p>
          W celu realizacji praw napisz na{" "}
          <a href="mailto:opowiedzianeswiatlem@gmail.com" className="text-accent underline">
            opowiedzianeswiatlem@gmail.com
          </a>.
        </p>

        <h2>6. Odbiorcy danych</h2>
        <p>
          Dane mogą być przekazywane dostawcom usług technicznych (hosting,
          poczta e-mail) w zakresie niezbędnym do świadczenia usługi.
          Nie sprzedajemy danych osobom trzecim.
        </p>

        <h2>7. Pliki cookies</h2>
        <p>
          Strona nie wykorzystuje plików cookies marketingowych ani
          analitycznych. Mogą być stosowane cookies techniczne niezbędne do
          działania strony.
        </p>

        <h2>8. Kontakt</h2>
        <p>
          W sprawach dotyczących prywatności skontaktuj się:{" "}
          <a href="mailto:opowiedzianeswiatlem@gmail.com" className="text-accent underline">
            opowiedzianeswiatlem@gmail.com
          </a>.
        </p>

        <p className="mt-10">
          <Link to="/" className="text-accent underline underline-offset-4 hover:text-ink">
            ← Wróć na stronę główną
          </Link>
        </p>
      </article>
    </div>
  );
}
