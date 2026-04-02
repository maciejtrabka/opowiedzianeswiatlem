import { motion, type Variants } from "framer-motion";
import type { PortfolioItem } from "../data/portfolio";
import {
  galleryImageFallbackUrl,
  storagePublicUrl,
} from "../lib/storagePublicUrl";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

type GalleryGridProps = {
  items: PortfolioItem[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <motion.ul
      layout
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          layout
          custom={i}
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="group overflow-hidden rounded-sm bg-section shadow-sm"
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={storagePublicUrl(item.storagePath)}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget;
                if (import.meta.env.VITE_USE_DEMO_GALLERY_IMAGES === "true")
                  return;
                if (el.dataset.fallback === "1") return;
                el.dataset.fallback = "1";
                el.src = galleryImageFallbackUrl(item.storagePath);
                if (import.meta.env.DEV) {
                  console.warn(
                    "[gallery] Nie załadowano z Supabase — użyto placeholdera. Sprawdź bucket, ścieżkę w portfolio.ts lub ustaw VITE_USE_DEMO_GALLERY_IMAGES=true. Pierwotny URL:",
                    storagePublicUrl(item.storagePath),
                  );
                }
              }}
            />
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
