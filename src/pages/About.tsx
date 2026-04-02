import { useEffect } from "react";
import ImageWithFallback from "../components/ImageWithFallback";
import { aboutPhotoFallbackSrc, aboutPhotoStoragePath } from "../data/site";
import { storagePublicUrl } from "../lib/storagePublicUrl";

export default function About() {
  useEffect(() => {
    document.title = "O mnie — Opowiedziane Światłem";
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-section bg-section/40 py-16 text-center md:py-20">
        <h1 className="font-serif text-4xl text-ink md:text-5xl">O mnie</h1>
        <p className="mx-auto mt-4 max-w-lg text-ink/75">
          Kilka słów o tym, kim jestem i jak pracuję.
        </p>
      </header>
      <section className="mx-auto max-w-2xl px-4 py-16 md:px-6 md:py-24" aria-label="O fotografce">
        <div className="mb-10 overflow-hidden rounded-sm bg-section shadow-sm">
          <ImageWithFallback
            src={storagePublicUrl(aboutPhotoStoragePath)}
            fallbackSrc={aboutPhotoFallbackSrc}
            alt="Kaja — fotografka"
            className="aspect-[4/5] w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <p className="font-serif text-xl text-ink md:text-2xl">Cześć, jestem Kaja.</p>
        <p className="mt-6 leading-relaxed text-ink/85">
          Fotografią zajmuję się z pasją i sercem. Wierzę w autentyczność —
          wolę szczere uśmiechy niż sztywne pozy. Na sesji i w dniu ślubu
          towarzyszę Wam z dyskretnością, tak abyście mogli być sobą.
        </p>
        <p className="mt-6 leading-relaxed text-ink/85">
          Moje zdjęcia mają być ponadczasowe: delikatne światło, naturalne
          kolory i emocje zamknięte w kadrze. Treść tej strony możesz uzupełnić
          o swoją historię, ulubione cytaty i zdjęcie autorskie.
        </p>
      </section>
    </div>
  );
}
