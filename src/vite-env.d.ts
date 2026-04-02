/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  /** Public Storage bucket name (default matches project bucket). */
  readonly VITE_SUPABASE_STORAGE_BUCKET?: string;
  /** Optional folder prefix inside the bucket, e.g. `uploads` → `uploads/realizacje/01.jpg`. */
  readonly VITE_SUPABASE_STORAGE_PREFIX?: string;
  /** If true, gallery/about images use remote placeholders instead of Storage (layout preview only). */
  readonly VITE_USE_DEMO_GALLERY_IMAGES?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
