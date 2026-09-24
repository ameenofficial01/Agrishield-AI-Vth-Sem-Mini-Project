import { useState } from "react";
import { FALLBACK_IMAGE, getCropImage, getPestImage } from "../../data/images";

export function CropThumb({
  crop,
  size = "md",
  className = "",
}: {
  crop: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(getCropImage(crop));

  const dim =
    size === "sm"
      ? "h-8 w-8"
      : size === "md"
      ? "h-12 w-12"
      : size === "lg"
      ? "h-16 w-16"
      : "h-24 w-24";

  return (
    <img
      src={imgSrc}
      alt={crop}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setImgSrc(FALLBACK_IMAGE)}
      className={`${dim} shrink-0 rounded-xl border border-line bg-white object-cover shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
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
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(getPestImage(pest));

  const dim =
    size === "sm"
      ? "h-8 w-8"
      : size === "md"
      ? "h-12 w-12"
      : size === "lg"
      ? "h-16 w-16"
      : "h-24 w-24";

  return (
    <img
      src={imgSrc}
      alt={pest}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() =>
        setImgSrc(
          "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80"
        )
      }
      className={`${dim} shrink-0 rounded-xl border border-line bg-white object-cover shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
      loading="lazy"
    />
  );
}
