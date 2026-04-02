import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HeroSlide } from "../data/portfolio";
import { storagePublicUrl } from "../lib/storagePublicUrl";
import ImageWithFallback from "./ImageWithFallback";

const INTERVAL_MS = 6000;

type HeroSliderProps = {
  slides: HeroSlide[];
};

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = slides[index];

  const next = useCallback(() => {
    setIndex((i) => (slides.length ? (i + 1) % slides.length : 0));
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length || paused) return undefined;
    const id = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length, paused, next]);

  if (!slides.length) return null;

  return (
    <div
      className="relative min-h-[85vh] w-full overflow-hidden bg-section md:min-h-[90vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={slide?.storagePath ?? index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {slide ? (
            <ImageWithFallback
              src={storagePublicUrl(slide.storagePath)}
              fallbackSrc={slide.fallbackSrc}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-ink/35" aria-hidden />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-4xl font-serif text-4xl font-medium leading-tight tracking-tight text-cream md:text-5xl lg:text-6xl">
          Opowiedziane Światłem
        </h1>
        <p className="mt-4 max-w-xl font-sans text-lg text-cream/95 md:text-xl">
          Fotografia pełna emocji
        </p>
      </div>
    </div>
  );
}
