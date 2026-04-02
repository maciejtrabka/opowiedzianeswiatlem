import { supabase } from "./supabase";

const bucket =
  import.meta.env.VITE_SUPABASE_STORAGE_BUCKET?.trim() ||
  "fotografie-opowiedziane-swiatlem";

const pathPrefix =
  import.meta.env.VITE_SUPABASE_STORAGE_PREFIX?.trim().replace(/\/+$/, "") ||
  "";

const useDemoGallery =
  import.meta.env.VITE_USE_DEMO_GALLERY_IMAGES === "true";

function resolveObjectPath(objectPath: string): string {
  const path = objectPath.replace(/^\/+/, "");
  if (!pathPrefix) return path;
  return `${pathPrefix}/${path}`;
}

/** Fallback image when Storage is missing or a tile fails to load. */
export const FALLBACK_IMAGE = "/fallback.png";

export function galleryImageFallbackUrl(_objectPath: string): string {
  return FALLBACK_IMAGE;
}

/** Public URL for an object in the configured Storage bucket (bucket must be public). */
export function storagePublicUrl(objectPath: string): string {
  /** Vite `public/` assets: path starts with `/` (e.g. `/portfolio/01.jpeg`). */
  if (objectPath.startsWith("/")) return objectPath;
  if (useDemoGallery) return galleryImageFallbackUrl(objectPath);
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(resolveObjectPath(objectPath));
  return data.publicUrl;
}
