import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HeroSlide } from "../data/portfolio";
import { storagePublicUrl } from "../lib/storagePublicUrl";
import ImageWithFallback from "./ImageWithFallback";

const INTERVAL_MS = 6000;
const MD_UP = "(min-width: 768px)";

type HeroSliderProps = {
  slides: HeroSlide[];
};

function usePrefersMdUp() {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MD_UP).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(MD_UP);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return matches;
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const isMdUp = usePrefersMdUp();

  const slide = slides[index];

  const next = useCallback(() => {
    setIndex((i) => (slides.length ? (i + 1) % slides.length : 0));
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex((i) =>
      slides.length ? (i - 1 + slides.length) % slides.length : 0,
    );
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length || paused || !isMdUp) return undefined;
    const id = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length, paused, isMdUp, next, index]);

  if (!slides.length) return null;

  const heroCopy = (
    <>
      <h1 className="max-w-4xl font-serif text-4xl font-medium leading-tight tracking-tight text-cream md:text-5xl lg:text-6xl">
        Opowiedziane Światłem
      </h1>
      <p className="mt-4 max-w-xl font-sans text-lg text-cream/95 md:text-xl">
        Fotografia pełna emocji
      </p>
    </>
  );

  return (
    <>
      <div className="flex flex-col md:hidden" role="group" aria-roledescription="karuzela" aria-label="Zdjęcia główne">
        {slides.map((s, i) => (
          <div key={s.storagePath} className="relative w-full bg-section">
            <ImageWithFallback
              src={storagePublicUrl(s.storagePath)}
              fallbackSrc={s.fallbackSrc}
              alt={`Fotografia ślubna ${i + 1}`}
              className="block h-auto w-full max-w-full"
            />
            <div className="absolute inset-0 bg-ink/35" aria-hidden />
            {i === 0 ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
                {heroCopy}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div
        className="relative hidden min-h-[85vh] w-full overflow-hidden bg-section md:block md:min-h-[90vh]"
        role="group"
        aria-roledescription="karuzela"
        aria-label="Zdjęcia główne"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false}>
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
                alt={`Fotografia ślubna ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-ink/35" aria-hidden />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          {heroCopy}
        </div>
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-2 md:px-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="pointer-events-auto p-2 font-serif text-2xl leading-none text-cream/80 transition hover:text-cream/70 md:text-3xl focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
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
            className="pointer-events-auto p-2 font-serif text-2xl leading-none text-cream/80 transition hover:text-cream/70 md:text-3xl focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            aria-label="Następne zdjęcie"
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}
