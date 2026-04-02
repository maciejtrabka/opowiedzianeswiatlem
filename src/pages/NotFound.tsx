import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Opowiedziane Światłem";
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-serif text-3xl text-ink md:text-4xl">
        Strona nie została znaleziona
      </h1>
      <p className="mt-4 max-w-md text-ink/75">
        Przepraszamy — strona, której szukasz, nie istnieje lub została przeniesiona.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block border border-accent bg-accent px-8 py-3 font-sans text-sm font-medium tracking-wide text-cream transition hover:border-ink hover:bg-ink"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
