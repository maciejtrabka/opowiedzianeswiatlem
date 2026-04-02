import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url?.trim() || !anonKey?.trim()) {
  throw new Error(
    "Brak konfiguracji Supabase: w katalogu głównym utwórz plik .env.local z VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY (patrz README).",
  );
}

/** Klient przeglądarkowy — klucz anon / publishable z Supabase → Project Settings → API. */
export const supabase = createClient(url.trim(), anonKey.trim());
