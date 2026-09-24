/**
 * Centralized crop / pest photographic image mapping.
 * Authentic agricultural imagery for visual identification.
 */

export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=600&q=80";

export const cropImages: Record<string, string> = {
  "Rice": "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
  "Coconut": "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?auto=format&fit=crop&w=600&q=80",
  "Tomato": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
  "Maize": "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
  "Cotton": "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80",
  "Banana": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
  "Chilli": "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
  "Coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
  "Brinjal": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
  "Okra": "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=600&q=80",
  "Groundnut": "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=600&q=80",
  "Sugarcane": "https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=600&q=80",
  "Rubber": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
  "Cocoa": "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
  "Ginger": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
  "Black Pepper": "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
  "Cardamom": "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80",
  "Arecanut": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
  "Turmeric": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
  "Pigeonpea": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
  "Finger Millet (Ragi)": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
  "Sorghum": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
  "Cashew": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
  "Tapioca": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
};

export const pestImages: Record<string, string> = {
  "Red Palm Weevil": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Rhynchophorus_ferrugineus_MHNT.jpg/640px-Rhynchophorus_ferrugineus_MHNT.jpg",
  "Rhinoceros Beetle": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Oryctes_rhinoceros.jpg/640px-Oryctes_rhinoceros.jpg",
  "Fall Armyworm": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spodoptera_frugiperda_larva.jpg/640px-Spodoptera_frugiperda_larva.jpg",
  "Whitefly": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Aleyrodes_proletella01.jpg/640px-Aleyrodes_proletella01.jpg",
  "Aphid": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Aphid_on_leaf.jpg/640px-Aphid_on_leaf.jpg",
  "Stem Borer": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Scirpophaga_incertulas.jpg/640px-Scirpophaga_incertulas.jpg",
  "Yellow Stem Borer": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Scirpophaga_incertulas.jpg/640px-Scirpophaga_incertulas.jpg",
  "Fruit Borer": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Helicoverpa_armigera01.jpg/640px-Helicoverpa_armigera01.jpg",
  "Shoot and Fruit Borer": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Leucinodes_orbonalis.jpg/640px-Leucinodes_orbonalis.jpg",
  "Tomato Fruit Borer": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Helicoverpa_armigera01.jpg/640px-Helicoverpa_armigera01.jpg",
  "Leaf Folder": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Cnaphalocrocis_medinalis.jpg/640px-Cnaphalocrocis_medinalis.jpg",
  "Brown Planthopper": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Nilaparvata_lugens.jpg/640px-Nilaparvata_lugens.jpg",
  "Spindle Bug": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Carvalhoia_arecae.jpg/640px-Carvalhoia_arecae.jpg",
  "Root Grub": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/White_grub.jpg/640px-White_grub.jpg",
  "Mealybug": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Pseudococcus_viburni.jpg/640px-Pseudococcus_viburni.jpg",
  "Thrips": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Frankliniella_occidentalis.jpg/640px-Frankliniella_occidentalis.jpg",
  "Mite": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Tetranychus_urticae_with_silk_threads.jpg/640px-Tetranychus_urticae_with_silk_threads.jpg",
  "Jassid": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Amrasca_biguttula.jpg/640px-Amrasca_biguttula.jpg",
  "Shoot Fly": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Atherigona_soccata.jpg/640px-Atherigona_soccata.jpg",
  "Gall Midge": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Orseolia_oryzae.jpg/640px-Orseolia_oryzae.jpg",
  "Maize Stem Borer": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Chilo_partellus.jpg/640px-Chilo_partellus.jpg",
  "Serpentine Leaf Miner": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Liriomyza_trifolii.jpg/640px-Liriomyza_trifolii.jpg",
  "Pink Bollworm": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pectinophora_gossypiella.jpg/640px-Pectinophora_gossypiella.jpg",
  "Tea Mosquito Bug": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Helopeltis_theivora.jpg/640px-Helopeltis_theivora.jpg"
};

export function getCropImage(crop: string): string {
  return cropImages[crop] ?? FALLBACK_IMAGE;
}

export function getPestImage(pest: string): string {
  return pestImages[pest] ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Aphid_on_leaf.jpg/640px-Aphid_on_leaf.jpg";
}
