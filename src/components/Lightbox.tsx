import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PortfolioItem } from "../data/portfolio";
import { storagePublicUrl } from "../lib/storagePublicUrl";

type LightboxProps = {
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onChange,
}: LightboxProps) {
  const prev = useCallback(() => {
    onChange((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onChange]);

  const next = useCallback(() => {
    onChange((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onChange]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const item = items[currentIndex];
  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-2 md:px-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="pointer-events-auto p-3 font-serif text-3xl leading-none text-cream/80 transition hover:text-cream md:text-4xl focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          aria-label="Poprzednie zdjęcie"
        >
          {"<"}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="pointer-events-auto p-3 font-serif text-3xl leading-none text-cream/80 transition hover:text-cream md:text-4xl focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          aria-label="Następne zdjęcie"
        >
          {">"}
        </button>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-3 top-3 z-20 p-2 font-sans text-2xl leading-none text-cream/80 transition hover:text-cream md:right-5 md:top-5 md:text-3xl focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
        aria-label="Zamknij"
      >
        ✕
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={item.id}
          src={storagePublicUrl(item.storagePath)}
          alt=""
          className="pointer-events-none relative z-0 max-h-[85vh] max-w-[90vw] rounded-sm object-contain"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        />
      </AnimatePresence>

      <div className="absolute bottom-4 z-20 font-sans text-sm text-cream/60">
        {currentIndex + 1} / {items.length}
      </div>
    </motion.div>
  );
}
