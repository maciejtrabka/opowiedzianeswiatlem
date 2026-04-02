export default function Offer() {
  const cards = [
    {
      title: "Reportaż ślubny",
      text: "Od przygotowań po oczepiny — pełna dokumentacja dnia w wybranym zakresie godzin.",
    },
    {
      title: "Sesja narzeczeńska",
      text: "Spokojna sesja przed ślubem, aby poznać się przed obiektywem i zbudować swobodę.",
    },
    {
      title: "Sesje rodzinne",
      text: "Rodzina, dzieci, ważne rocznice — krótkie lub dłuższe spotkania w plenerze lub w domu.",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-section bg-section/40 py-16 text-center md:py-20">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">Oferta</h1>
        <p className="mx-auto mt-4 max-w-lg text-ink/75">
          Pakiety i możliwości współpracy — dopasujemy szczegóły do Waszych potrzeb.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-16 md:grid-cols-3 md:px-6 md:py-24">
        {cards.map((card) => (
          <article
            key={card.title}
            className="border border-section bg-cream p-8 shadow-sm transition hover:border-accent/40"
          >
            <h2 className="font-serif text-xl text-ink">{card.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/80">{card.text}</p>
          </article>
        ))}
      </div>
      <p className="mx-auto max-w-xl px-4 pb-20 text-center text-sm text-ink/65 md:px-6">
        Szczegółowe ceny i dostępność terminów ustalamy indywidualnie — napisz
        przez formularz kontaktowy.
      </p>
    </div>
  );
}
