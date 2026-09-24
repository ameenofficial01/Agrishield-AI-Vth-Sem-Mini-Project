import { useEffect, useState } from "react";
import { FALLBACK_IMAGE, getCropImage, getPestImage } from "../../data/images";
import { fetchAPI } from "../../utils/api";

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

  useEffect(() => {
    setImgSrc(getCropImage(crop));

    const cached = sessionStorage.getItem(`crop_img_${crop}`);
    if (cached) {
      setImgSrc(cached);
      return;
    }

    // Live search dynamically when user selects crop
    fetchAPI(`/images/search?query=${encodeURIComponent(crop)}`)
      .then((res) => {
        if (res?.url) {
          sessionStorage.setItem(`crop_img_${crop}`, res.url);
          setImgSrc(res.url);
        }
      })
      .catch(() => {});
  }, [crop]);

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

  useEffect(() => {
    setImgSrc(getPestImage(pest));

    const cached = sessionStorage.getItem(`pest_img_${pest}`);
    if (cached) {
      setImgSrc(cached);
      return;
    }

    // Live search dynamically when user selects pest
    fetchAPI(`/images/search?query=${encodeURIComponent(pest)}`)
      .then((res) => {
        if (res?.url) {
          sessionStorage.setItem(`pest_img_${pest}`, res.url);
          setImgSrc(res.url);
        }
      })
      .catch(() => {});
  }, [pest]);

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
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Aphid_on_leaf.jpg/640px-Aphid_on_leaf.jpg"
        )
      }
      className={`${dim} shrink-0 rounded-xl border border-line bg-white object-cover shadow-sm transition-transform duration-200 hover:scale-105 ${className}`}
      loading="lazy"
    />
  );
}
