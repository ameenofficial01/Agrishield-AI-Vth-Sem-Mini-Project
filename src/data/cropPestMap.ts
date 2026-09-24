import type { PestMeta } from "../types";

export const CROPS = [
  "Arecanut",
  "Banana",
  "Black Pepper",
  "Brinjal",
  "Cardamom",
  "Cashew",
  "Chilli",
  "Cocoa",
  "Coconut",
  "Coffee",
  "Cotton",
  "Finger Millet (Ragi)",
  "Ginger",
  "Groundnut",
  "Maize",
  "Okra",
  "Pigeonpea",
  "Rice",
  "Rubber",
  "Sorghum",
  "Sugarcane",
  "Tapioca",
  "Tomato",
  "Turmeric"
] as const;

export const CROP_PESTS: Record<string, string[]> = {
  "Arecanut": [
    "Inflorescence Caterpillar",
    "Root Grub",
    "Spindle Bug"
  ],
  "Banana": [
    "Banana Aphid",
    "Pseudostem Weevil",
    "Rhizome Weevil"
  ],
  "Black Pepper": [
    "Pollu Beetle",
    "Scale Insect",
    "Top Shoot Borer"
  ],
  "Brinjal": [
    "Aphid",
    "Shoot and Fruit Borer",
    "Whitefly"
  ],
  "Cardamom": [
    "Shoot and Capsule Borer",
    "Thrips"
  ],
  "Cashew": [
    "Stem and Root Borer",
    "Tea Mosquito Bug"
  ],
  "Chilli": [
    "Fruit Borer",
    "Mite",
    "Thrips"
  ],
  "Cocoa": [
    "Mealybug",
    "Pod Borer",
    "Tea Mosquito Bug"
  ],
  "Coconut": [
    "Black Headed Caterpillar",
    "Eriophyid Mite",
    "Red Palm Weevil",
    "Rhinoceros Beetle"
  ],
  "Coffee": [
    "Coffee Berry Borer",
    "Mealybug",
    "White Stem Borer"
  ],
  "Cotton": [
    "Cotton Aphid",
    "Pink Bollworm",
    "Whitefly"
  ],
  "Finger Millet (Ragi)": [
    "Pink Stem Borer",
    "Shoot Fly"
  ],
  "Ginger": [
    "Rhizome Scale",
    "Shoot Borer"
  ],
  "Groundnut": [
    "Aphid",
    "Leaf Miner",
    "Tobacco Caterpillar"
  ],
  "Maize": [
    "Corn Aphid",
    "Fall Armyworm",
    "Maize Stem Borer"
  ],
  "Okra": [
    "Jassid",
    "Shoot and Fruit Borer",
    "Whitefly"
  ],
  "Pigeonpea": [
    "Gram Pod Borer",
    "Plume Moth",
    "Pod Fly"
  ],
  "Rice": [
    "Brown Planthopper",
    "Gall Midge",
    "Leaf Folder",
    "Yellow Stem Borer"
  ],
  "Rubber": [
    "Mealybug",
    "Scale Insect",
    "Termite"
  ],
  "Sorghum": [
    "Earhead Bug",
    "Shoot Fly",
    "Stem Borer"
  ],
  "Sugarcane": [
    "Early Shoot Borer",
    "Internode Borer",
    "Woolly Aphid"
  ],
  "Tapioca": [
    "Cassava Mosaic Whitefly",
    "Mealybug",
    "Scale Insect"
  ],
  "Tomato": [
    "Serpentine Leaf Miner",
    "Tomato Fruit Borer",
    "Whitefly"
  ],
  "Turmeric": [
    "Rhizome Scale",
    "Shoot Borer"
  ]
};

export const CROP_STAGES: Record<string, string[]> = {
  "Arecanut": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Banana": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Black Pepper": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Brinjal": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Cardamom": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Cashew": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Chilli": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Cocoa": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Coconut": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Coffee": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Cotton": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Finger Millet (Ragi)": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Ginger": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Groundnut": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Maize": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Okra": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Pigeonpea": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Rice": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Rubber": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Sorghum": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Sugarcane": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Tapioca": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Tomato": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ],
  "Turmeric": [
    "Sowing",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Harvest"
  ]
};

export const PEST_META: Record<string, PestMeta> = {
  "Aphid": {
    "scientific": "Aphid spp.",
    "group": "Agricultural Pest"
  },
  "Banana Aphid": {
    "scientific": "Banana Aphid spp.",
    "group": "Agricultural Pest"
  },
  "Black Headed Caterpillar": {
    "scientific": "Black Headed Caterpillar spp.",
    "group": "Agricultural Pest"
  },
  "Brown Planthopper": {
    "scientific": "Brown Planthopper spp.",
    "group": "Agricultural Pest"
  },
  "Cassava Mosaic Whitefly": {
    "scientific": "Cassava Mosaic Whitefly spp.",
    "group": "Agricultural Pest"
  },
  "Coffee Berry Borer": {
    "scientific": "Coffee Berry Borer spp.",
    "group": "Agricultural Pest"
  },
  "Corn Aphid": {
    "scientific": "Corn Aphid spp.",
    "group": "Agricultural Pest"
  },
  "Cotton Aphid": {
    "scientific": "Cotton Aphid spp.",
    "group": "Agricultural Pest"
  },
  "Earhead Bug": {
    "scientific": "Earhead Bug spp.",
    "group": "Agricultural Pest"
  },
  "Early Shoot Borer": {
    "scientific": "Early Shoot Borer spp.",
    "group": "Agricultural Pest"
  },
  "Eriophyid Mite": {
    "scientific": "Eriophyid Mite spp.",
    "group": "Agricultural Pest"
  },
  "Fall Armyworm": {
    "scientific": "Fall Armyworm spp.",
    "group": "Agricultural Pest"
  },
  "Fruit Borer": {
    "scientific": "Fruit Borer spp.",
    "group": "Agricultural Pest"
  },
  "Gall Midge": {
    "scientific": "Gall Midge spp.",
    "group": "Agricultural Pest"
  },
  "Gram Pod Borer": {
    "scientific": "Gram Pod Borer spp.",
    "group": "Agricultural Pest"
  },
  "Inflorescence Caterpillar": {
    "scientific": "Inflorescence Caterpillar spp.",
    "group": "Agricultural Pest"
  },
  "Internode Borer": {
    "scientific": "Internode Borer spp.",
    "group": "Agricultural Pest"
  },
  "Jassid": {
    "scientific": "Jassid spp.",
    "group": "Agricultural Pest"
  },
  "Leaf Folder": {
    "scientific": "Leaf Folder spp.",
    "group": "Agricultural Pest"
  },
  "Leaf Miner": {
    "scientific": "Leaf Miner spp.",
    "group": "Agricultural Pest"
  },
  "Maize Stem Borer": {
    "scientific": "Maize Stem Borer spp.",
    "group": "Agricultural Pest"
  },
  "Mealybug": {
    "scientific": "Mealybug spp.",
    "group": "Agricultural Pest"
  },
  "Mite": {
    "scientific": "Mite spp.",
    "group": "Agricultural Pest"
  },
  "Pink Bollworm": {
    "scientific": "Pink Bollworm spp.",
    "group": "Agricultural Pest"
  },
  "Pink Stem Borer": {
    "scientific": "Pink Stem Borer spp.",
    "group": "Agricultural Pest"
  },
  "Plume Moth": {
    "scientific": "Plume Moth spp.",
    "group": "Agricultural Pest"
  },
  "Pod Borer": {
    "scientific": "Pod Borer spp.",
    "group": "Agricultural Pest"
  },
  "Pod Fly": {
    "scientific": "Pod Fly spp.",
    "group": "Agricultural Pest"
  },
  "Pollu Beetle": {
    "scientific": "Pollu Beetle spp.",
    "group": "Agricultural Pest"
  },
  "Pseudostem Weevil": {
    "scientific": "Pseudostem Weevil spp.",
    "group": "Agricultural Pest"
  },
  "Red Palm Weevil": {
    "scientific": "Red Palm Weevil spp.",
    "group": "Agricultural Pest"
  },
  "Rhinoceros Beetle": {
    "scientific": "Rhinoceros Beetle spp.",
    "group": "Agricultural Pest"
  },
  "Rhizome Scale": {
    "scientific": "Rhizome Scale spp.",
    "group": "Agricultural Pest"
  },
  "Rhizome Weevil": {
    "scientific": "Rhizome Weevil spp.",
    "group": "Agricultural Pest"
  },
  "Root Grub": {
    "scientific": "Root Grub spp.",
    "group": "Agricultural Pest"
  },
  "Scale Insect": {
    "scientific": "Scale Insect spp.",
    "group": "Agricultural Pest"
  },
  "Serpentine Leaf Miner": {
    "scientific": "Serpentine Leaf Miner spp.",
    "group": "Agricultural Pest"
  },
  "Shoot Borer": {
    "scientific": "Shoot Borer spp.",
    "group": "Agricultural Pest"
  },
  "Shoot Fly": {
    "scientific": "Shoot Fly spp.",
    "group": "Agricultural Pest"
  },
  "Shoot and Capsule Borer": {
    "scientific": "Shoot and Capsule Borer spp.",
    "group": "Agricultural Pest"
  },
  "Shoot and Fruit Borer": {
    "scientific": "Shoot and Fruit Borer spp.",
    "group": "Agricultural Pest"
  },
  "Spindle Bug": {
    "scientific": "Spindle Bug spp.",
    "group": "Agricultural Pest"
  },
  "Stem Borer": {
    "scientific": "Stem Borer spp.",
    "group": "Agricultural Pest"
  },
  "Stem and Root Borer": {
    "scientific": "Stem and Root Borer spp.",
    "group": "Agricultural Pest"
  },
  "Tea Mosquito Bug": {
    "scientific": "Tea Mosquito Bug spp.",
    "group": "Agricultural Pest"
  },
  "Termite": {
    "scientific": "Termite spp.",
    "group": "Agricultural Pest"
  },
  "Thrips": {
    "scientific": "Thrips spp.",
    "group": "Agricultural Pest"
  },
  "Tobacco Caterpillar": {
    "scientific": "Tobacco Caterpillar spp.",
    "group": "Agricultural Pest"
  },
  "Tomato Fruit Borer": {
    "scientific": "Tomato Fruit Borer spp.",
    "group": "Agricultural Pest"
  },
  "Top Shoot Borer": {
    "scientific": "Top Shoot Borer spp.",
    "group": "Agricultural Pest"
  },
  "White Stem Borer": {
    "scientific": "White Stem Borer spp.",
    "group": "Agricultural Pest"
  },
  "Whitefly": {
    "scientific": "Whitefly spp.",
    "group": "Agricultural Pest"
  },
  "Woolly Aphid": {
    "scientific": "Woolly Aphid spp.",
    "group": "Agricultural Pest"
  },
  "Yellow Stem Borer": {
    "scientific": "Yellow Stem Borer spp.",
    "group": "Agricultural Pest"
  }
};
