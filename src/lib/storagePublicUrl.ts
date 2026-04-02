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

/** Deterministic placeholder when Storage is missing or a tile fails to load. */
export function galleryImageFallbackUrl(objectPath: string): string {
  const seed = resolveObjectPath(objectPath).replace(/\W/g, "") || "demo";
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/1067`;
}

/** Public URL for an object in the configured Storage bucket (bucket must be public). */
export function storagePublicUrl(objectPath: string): string {
  if (useDemoGallery) return galleryImageFallbackUrl(objectPath);
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(resolveObjectPath(objectPath));
  return data.publicUrl;
}
