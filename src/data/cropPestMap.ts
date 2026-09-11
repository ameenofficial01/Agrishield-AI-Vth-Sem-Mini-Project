import type { PestMeta } from "../types";

export const CROPS = ["Rice", "Maize", "Tomato", "Coconut", "Arecanut"] as const;

export const CROP_PESTS: Record<string, string[]> = {
  Rice: ["Stem Borer", "Brown Plant Hopper", "Leaf Folder"],
  Maize: ["Fall Armyworm", "Stem Borer"],
  Tomato: ["Whitefly", "Fruit Borer", "Leaf Miner"],
  Coconut: ["Rhinoceros Beetle", "Red Palm Weevil"],
  Arecanut: ["Spindle Bug", "Root Grub"],
};

export const CROP_STAGES: Record<string, string[]> = {
  Rice: ["Nursery", "Tillering", "Panicle Initiation", "Flowering", "Grain Filling"],
  Maize: ["Sowing", "Vegetative", "Tasseling", "Silking", "Grain Filling"],
  Tomato: ["Nursery", "Vegetative", "Flowering", "Fruiting", "Harvest"],
  Coconut: ["Juvenile", "Bearing", "Peak Bearing"],
  Arecanut: ["Juvenile", "Bearing", "Peak Bearing"],
};

export const PEST_META: Record<string, PestMeta> = {
  "Stem Borer": { scientific: "Scirpophaga incertulas", group: "Lepidoptera · Pyralidae" },
  "Brown Plant Hopper": { scientific: "Nilaparvata lugens", group: "Hemiptera · Delphacidae" },
  "Leaf Folder": { scientific: "Cnaphalocrocis medinalis", group: "Lepidoptera · Crambidae" },
  "Fall Armyworm": { scientific: "Spodoptera frugiperda", group: "Lepidoptera · Noctuidae" },
  Whitefly: { scientific: "Bemisia tabaci", group: "Hemiptera · Aleyrodidae" },
  "Fruit Borer": { scientific: "Helicoverpa armigera", group: "Lepidoptera · Noctuidae" },
  "Leaf Miner": { scientific: "Liriomyza trifolii", group: "Diptera · Agromyzidae" },
  "Rhinoceros Beetle": { scientific: "Oryctes rhinoceros", group: "Coleoptera · Scarabaeidae" },
  "Red Palm Weevil": { scientific: "Rhynchophorus ferrugineus", group: "Coleoptera · Curculionidae" },
  "Spindle Bug": { scientific: "Carvalhoia arecae", group: "Hemiptera · Miridae" },
  "Root Grub": { scientific: "Leucopholis coneophora", group: "Coleoptera · Scarabaeidae" },
};
