import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "../data/faq";

type FAQAccordionProps = {
  items: FaqItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="list-none divide-y divide-section border border-section bg-cream">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <li key={item.id}>
            <button
              type="button"
              className={`flex w-full items-center justify-between gap-4 px-5 text-left transition hover:bg-section/40 md:px-6 ${
                index === 0
                  ? "pb-4 pt-5 md:pb-5 md:pt-6"
                  : "py-4 md:py-5"
              }`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg text-ink md:text-xl">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-accent transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 pt-0 text-sm leading-relaxed text-ink/80 md:px-6 md:pb-6">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
