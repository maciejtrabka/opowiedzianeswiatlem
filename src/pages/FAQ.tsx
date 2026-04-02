import { useEffect } from "react";
import FAQAccordion from "../components/FAQAccordion";
import { faqItems } from "../data/faq";

export default function FAQ() {
  useEffect(() => {
    document.title = "Najczęstsze pytania — Opowiedziane Światłem";
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-section bg-section/40 py-16 text-center md:py-20">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">
          Najczęstsze pytania
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-ink/75">
          Odpowiedzi na najczęstsze pytania przed ślubem i sesją.
        </p>
      </header>
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-20" aria-label="Lista pytań i odpowiedzi">
        <FAQAccordion items={faqItems} />
      </section>
    </div>
  );
}
