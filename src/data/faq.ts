export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "rain",
    question: "Co jeśli w dniu ślubu pada deszcz?",
    answer:
      "Deszcz nie musi być problemem — często daje wyjątkowy klimat i miękkie światło. Zawsze mam plan B (np. zdjęcia pod daszkami, w plenerze z parasolami lub w wnętrzach). Przed dniem ślubu omawiamy scenariusze, żebyście czuli się spokojnie niezależnie od pogody.",
  },
  {
    id: "delivery",
    question: "Jak długo czeka się na gotowe zdjęcia?",
    answer:
      "Standardowy czas to około 4–8 tygodni od ślubu, w zależności od sezonu i zakresu reportażu. Po wyborze zdjęć do obróbki przygotowuję galerię online do pobrania w wysokiej rozdzielczości. Dokładny harmonogram ustalamy w umowie.",
  },
  {
    id: "church",
    question: "Czy można fotografować podczas mszy w kościele?",
    answer:
      "Zasady zależą od konkretnej parafii i księdza. Zwykle przed ślubem warto zapytać o zgodę na zdjęcia i ewentualne ograniczenia (np. tylko z balkonu, bez lampy błyskowej). Chętnie pomogę w rozmowie z księdzem, jeśli będzie taka potrzeba.",
  },
  {
    id: "second",
    question: "Czy pracujesz z drugim fotografem?",
    answer:
      "Na większych weselach możliwa jest współpraca z drugim operatorem — omawiamy to przy umowie, aby pokryć równolegle przygotowania panny młodej i pana młodego oraz uroczystość z różnych perspektyw.",
  },
  {
    id: "travel",
    question: "Czy dojeżdżasz na śluby poza miastem?",
    answer:
      "Tak — realizuję reportaże w całej Polsce i za granicą. Dojazd i ewentualny nocleg wliczamy indywidualnie w zależności od lokalizacji.",
  },
];
