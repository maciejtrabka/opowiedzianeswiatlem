export type PortfolioCategory =
  | "Reportaż ślubny"
  | "Narzeczeńska"
  | "Plener ślubny"
  | "Rodzinna"
  | "Dziecięca";

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  /**
   * Supabase: path inside the public bucket (plus optional VITE_SUPABASE_STORAGE_PREFIX).
   * Local: URL path under `public/` (leading `/`), e.g. `/portfolio/01.jpeg`.
   */
  storagePath: string;
};

function localPortfolioPath(n: number): string {
  return `/portfolio/${String(n).padStart(2, "0")}.jpeg`;
}

/**
 * Zdjęcia z `public/portfolio/` — bez plików 01, 02, 03, 04, 05, 07, 08, 34.
 */
export const portfolioItems: PortfolioItem[] = [
  { id: "1", category: "Reportaż ślubny", storagePath: localPortfolioPath(16) },
  { id: "2", category: "Reportaż ślubny", storagePath: localPortfolioPath(33) },
  { id: "3", category: "Reportaż ślubny", storagePath: localPortfolioPath(29) },
  { id: "4", category: "Reportaż ślubny", storagePath: localPortfolioPath(6) },
  { id: "5", category: "Reportaż ślubny", storagePath: localPortfolioPath(10) },
  { id: "6", category: "Reportaż ślubny", storagePath: localPortfolioPath(15) },
  { id: "7", category: "Narzeczeńska", storagePath: localPortfolioPath(22) },
  { id: "8", category: "Narzeczeńska", storagePath: localPortfolioPath(26) },
  { id: "9", category: "Narzeczeńska", storagePath: localPortfolioPath(9) },
  { id: "10", category: "Plener ślubny", storagePath: localPortfolioPath(13) },
  { id: "11", category: "Plener ślubny", storagePath: localPortfolioPath(17) },
  { id: "12", category: "Plener ślubny", storagePath: localPortfolioPath(14) },
  { id: "13", category: "Plener ślubny", storagePath: localPortfolioPath(25) },
  { id: "14", category: "Plener ślubny", storagePath: localPortfolioPath(12) },
  { id: "15", category: "Plener ślubny", storagePath: localPortfolioPath(28) },
  { id: "16", category: "Rodzinna", storagePath: localPortfolioPath(27) },
  { id: "17", category: "Rodzinna", storagePath: localPortfolioPath(18) },
  { id: "18", category: "Rodzinna", storagePath: localPortfolioPath(30) },
  { id: "19", category: "Rodzinna", storagePath: localPortfolioPath(19) },
  { id: "20", category: "Rodzinna", storagePath: localPortfolioPath(24) },
  { id: "21", category: "Dziecięca", storagePath: localPortfolioPath(20) },
  { id: "22", category: "Dziecięca", storagePath: localPortfolioPath(32) },
  { id: "23", category: "Dziecięca", storagePath: localPortfolioPath(31) },
  { id: "24", category: "Dziecięca", storagePath: localPortfolioPath(21) },
  { id: "25", category: "Dziecięca", storagePath: localPortfolioPath(11) },
  { id: "26", category: "Dziecięca", storagePath: localPortfolioPath(23) },
];

export const portfolioCategories: PortfolioCategory[] = [
  "Reportaż ślubny",
  "Narzeczeńska",
  "Plener ślubny",
  "Rodzinna",
  "Dziecięca",
];

export type HeroSlide = {
  /** Path inside the public bucket (plus optional VITE_SUPABASE_STORAGE_PREFIX). */
  storagePath: string;
  fallbackSrc: string;
};

/** Bucket: `ui/hero/01.jpg`, `02.jpg`, … (same convention as portfolio paths). */
export const heroSlides: HeroSlide[] = [
  {
    storagePath: "ui/hero/11.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85",
  },
  {
    storagePath: "ui/hero/13.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85",
  },
  {
    storagePath: "ui/hero/12.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=85",
  },
  {
    storagePath: "ui/hero/14.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85",
  },
  {
    storagePath: "ui/hero/15.jpg",
    fallbackSrc:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=85",
  },
];
