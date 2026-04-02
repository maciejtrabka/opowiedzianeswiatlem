export type PortfolioCategory =
  | "Zaręczyny"
  | "Sesja ślubna"
  | "Ceremonia"
  | "Wesele"
  | "Rodzina"
  | "Dzieci";

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  /** Path inside the public bucket (plus optional VITE_SUPABASE_STORAGE_PREFIX). */
  storagePath: string;
};

/**
 * Paths = object keys in the public bucket (plus optional VITE_SUPABASE_STORAGE_PREFIX).
 * Bucket layout (Dashboard): portfolio/{kategoria}/opowiedziane-swiatlem-{slug}-NN.jpg
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    category: "Zaręczyny",
    storagePath:
      "portfolio/sesja-narzeczenska/opowiedziane-swiatlem-narzeczenska-01.jpg",
  },
  {
    id: "2",
    category: "Zaręczyny",
    storagePath:
      "portfolio/sesja-narzeczenska/opowiedziane-swiatlem-narzeczenska-02.jpg",
  },
  {
    id: "3",
    category: "Sesja ślubna",
    storagePath: "portfolio/sesja-slubna/opowiedziane-swiatlem-plener-01.jpg",
  },
  {
    id: "4",
    category: "Sesja ślubna",
    storagePath: "portfolio/sesja-slubna/opowiedziane-swiatlem-plener-02.jpg",
  },
  {
    id: "5",
    category: "Ceremonia",
    storagePath: "portfolio/slub/opowiedziane-swiatlem-slub-01.jpg",
  },
  {
    id: "6",
    category: "Ceremonia",
    storagePath: "portfolio/slub/opowiedziane-swiatlem-slub-02.jpg",
  },
  {
    id: "7",
    category: "Wesele",
    storagePath: "portfolio/wesele/opowiedziane-swiatlem-wesele-01.jpg",
  },
  {
    id: "8",
    category: "Wesele",
    storagePath: "portfolio/wesele/opowiedziane-swiatlem-wesele-02.jpg",
  },
  {
    id: "9",
    category: "Rodzina",
    storagePath:
      "portfolio/sesja-rodzinna/opowiedziane-swiatlem-rodzinna-01.jpg",
  },
  {
    id: "10",
    category: "Rodzina",
    storagePath:
      "portfolio/sesja-rodzinna/opowiedziane-swiatlem-rodzinna-02.jpg",
  },
  {
    id: "11",
    category: "Dzieci",
    storagePath:
      "portfolio/sesja-dziecieca/opowiedziane-swiatlem-dziecieca-01.jpg",
  },
  {
    id: "12",
    category: "Dzieci",
    storagePath:
      "portfolio/sesja-dziecieca/opowiedziane-swiatlem-dziecieca-02.jpg",
  },
];

export const portfolioCategories: PortfolioCategory[] = [
  "Zaręczyny",
  "Sesja ślubna",
  "Ceremonia",
  "Wesele",
  "Rodzina",
  "Dzieci",
];

export type HeroSlide = {
  /** Path inside the public bucket (plus optional VITE_SUPABASE_STORAGE_PREFIX). */
  storagePath: string;
  fallbackSrc: string;
};

/** Bucket: `ui/hero/01.jpg`, `02.jpg`, … (same convention as portfolio paths). */
export const heroSlides: HeroSlide[] = [
  {
    storagePath: "ui/hero/01.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85",
  },
  {
    storagePath: "ui/hero/02.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=85",
  },
];
