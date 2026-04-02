import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import { heroSlides } from "../data/portfolio";

export default function Home() {
  return (
    <>
      <HeroSlider slides={heroSlides} />
      <section className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6 md:py-28">
        <p className="font-serif text-2xl text-ink md:text-3xl">
          Historie, które zostają na zawsze
        </p>
        <p className="mt-6 text-base leading-relaxed text-ink/80 md:text-lg">
          Witaj — jestem Kaja. Uwieczniam śluby i rodzinne chwile w sposób
          naturalny i pełen ciepła. Moim celem jest, abyś po latach wracał do
          zdjęć z takim samym wzruszeniem jak w dniu ich powstania.
        </p>
        <Link
          to="/portfolio"
          className="mt-10 inline-block border border-accent bg-accent px-8 py-3 font-sans text-sm font-medium tracking-wide text-cream transition hover:bg-ink hover:border-ink"
        >
          Zobacz realizacje
        </Link>
      </section>
    </>
  );
}
