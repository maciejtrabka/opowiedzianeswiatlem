import { useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GalleryGrid from "../components/GalleryGrid";
import Lightbox from "../components/Lightbox";
import {
  portfolioCategories,
  portfolioItems,
  type PortfolioCategory,
} from "../data/portfolio";

const ALL = "Wszystkie" as const;
type PortfolioTab = typeof ALL | PortfolioCategory;

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioTab>(ALL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tabs = useMemo(() => [ALL, ...portfolioCategories] as const, []);

  const filtered = useMemo(() => {
    if (active === ALL) return portfolioItems;
    return portfolioItems.filter((p) => p.category === active);
  }, [active]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  return (
    <div className="min-h-screen bg-cream">
      <div className="border-b border-section bg-section/40 py-16 text-center md:py-20">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">Realizacje</h1>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div
          className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3"
          role="tablist"
          aria-label="Kategorie realizacji"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === tab}
              onClick={() => setActive(tab)}
              className={`rounded-full border px-4 py-2 text-sm tracking-wide transition md:px-5 ${
                active === tab
                  ? "border-accent bg-accent text-cream"
                  : "border-section bg-cream text-ink/80 hover:border-accent/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {filtered.length === 0 ? (
              <p className="py-16 text-center text-ink/60">
                Brak zdjęć w tej kategorii.
              </p>
            ) : (
              <GalleryGrid
                items={filtered}
                onImageClick={(i) => setLightboxIndex(i)}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={filtered}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
