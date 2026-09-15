import { getCropImage, getPestImage } from "../../data/images";

/**
 * Compact identification thumbnail for a crop or pest. Centralizing this
 * here (rather than scattering <img> + path logic across pages) means the
 * image source can later switch to a backend-provided `imageUrl` field
 * without touching any page component.
 */
export function CropThumb({
  crop,
  size = "md",
  className = "",
}: {
  crop: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-11 w-11";
  return (
    <img
      src={getCropImage(crop)}
      alt={crop}
      className={`${dim} shrink-0 rounded-full border border-line bg-white object-cover ${className}`}
      loading="lazy"
    />
  );
}

export function PestThumb({
  pest,
  size = "md",
  className = "",
}: {
  pest: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-11 w-11";
  return (
    <img
      src={getPestImage(pest)}
      alt={pest}
      className={`${dim} shrink-0 rounded-full border border-line bg-white object-cover ${className}`}
      loading="lazy"
    />
  );
}
