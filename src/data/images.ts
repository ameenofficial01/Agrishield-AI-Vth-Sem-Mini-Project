/**
 * Centralized crop / pest image mapping.
 *
 * These are prototype illustrations (not photographs) — there is no live
 * image backend yet. The lookup shape below is deliberately the same shape
 * a future API response would use, so swapping this file for a fetch() call
 * against `imageUrl` fields from FastAPI/the database later is a drop-in
 * change; nothing that reads from these helpers needs to change.
 */

export const FALLBACK_IMAGE = "/images/fallback.svg";

export const cropImages: Record<string, string> = {
  Rice: "/images/crops/rice.svg",
  Maize: "/images/crops/maize.svg",
  Tomato: "/images/crops/tomato.svg",
  Coconut: "/images/crops/coconut.svg",
  Arecanut: "/images/crops/arecanut.svg",
};

export const pestImages: Record<string, string> = {
  "Stem Borer": "/images/pests/stem-borer.svg",
  "Brown Plant Hopper": "/images/pests/brown-planthopper.svg",
  "Leaf Folder": "/images/pests/leaf-folder.svg",
  "Fall Armyworm": "/images/pests/fall-armyworm.svg",
  Whitefly: "/images/pests/whitefly.svg",
  "Fruit Borer": "/images/pests/fruit-borer.svg",
  "Leaf Miner": "/images/pests/leaf-miner.svg",
  "Rhinoceros Beetle": "/images/pests/rhinoceros-beetle.svg",
  "Red Palm Weevil": "/images/pests/red-palm-weevil.svg",
  "Spindle Bug": "/images/pests/spindle-bug.svg",
  "Root Grub": "/images/pests/root-grub.svg",
};

export function getCropImage(crop: string): string {
  return cropImages[crop] ?? FALLBACK_IMAGE;
}

export function getPestImage(pest: string): string {
  return pestImages[pest] ?? FALLBACK_IMAGE;
}
