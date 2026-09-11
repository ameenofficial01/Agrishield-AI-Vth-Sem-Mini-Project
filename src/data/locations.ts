import type { StateInfo } from "../types";

export const STATES: StateInfo[] = [
  {
    name: "Karnataka",
    districts: [
      { name: "Dakshina Kannada", lat: 12.86, lng: 75.14 },
      { name: "Udupi", lat: 13.34, lng: 74.79 },
      { name: "Mysuru", lat: 12.3, lng: 76.65 },
      { name: "Hassan", lat: 13.01, lng: 76.1 },
      { name: "Kodagu", lat: 12.42, lng: 75.72 },
    ],
  },
  {
    name: "Kerala",
    districts: [
      { name: "Kasaragod", lat: 12.51, lng: 74.99 },
      { name: "Kannur", lat: 11.87, lng: 75.37 },
      { name: "Wayanad", lat: 11.7, lng: 76.08 },
    ],
  },
];

export const DISTRICT_META: Record<
  string,
  { zone: string; stations: number; area: string; majorCrops: string[]; lastSurvey: string }
> = {
  "Dakshina Kannada": { zone: "Coastal Zone (Zone 10)", stations: 14, area: "4,560 km²", majorCrops: ["Rice", "Arecanut", "Coconut"], lastSurvey: "2 days ago" },
  Udupi: { zone: "Coastal Zone (Zone 10)", stations: 11, area: "3,582 km²", majorCrops: ["Rice", "Arecanut", "Coconut"], lastSurvey: "3 days ago" },
  Mysuru: { zone: "Southern Dry Zone (Zone 6)", stations: 12, area: "6,854 km²", majorCrops: ["Maize", "Rice"], lastSurvey: "1 day ago" },
  Hassan: { zone: "Southern Transition Zone (Zone 7)", stations: 10, area: "6,814 km²", majorCrops: ["Tomato", "Maize", "Coconut"], lastSurvey: "4 days ago" },
  Kodagu: { zone: "Hilly Zone (Zone 9)", stations: 8, area: "4,102 km²", majorCrops: ["Rice", "Arecanut"], lastSurvey: "5 days ago" },
  Kasaragod: { zone: "High Range Zone", stations: 9, area: "1,992 km²", majorCrops: ["Coconut", "Arecanut", "Rice"], lastSurvey: "2 days ago" },
  Kannur: { zone: "Northern Zone", stations: 10, area: "2,966 km²", majorCrops: ["Coconut", "Tomato"], lastSurvey: "3 days ago" },
  Wayanad: { zone: "High Range Zone", stations: 7, area: "2,131 km²", majorCrops: ["Rice", "Maize"], lastSurvey: "6 days ago" },
};

export interface AreaDef {
  name: string;
  lat: number;
  lng: number;
}

export const AREAS_BY_DISTRICT: Record<string, AreaDef[]> = {
  "Dakshina Kannada": [
    { name: "Mangaluru", lat: 12.9148, lng: 74.856 },
    { name: "Bantwal", lat: 12.8765, lng: 75.0419 },
    { name: "Puttur", lat: 12.7596, lng: 75.2017 },
    { name: "Sullia", lat: 12.5565, lng: 75.3866 },
    { name: "Belthangady", lat: 12.994, lng: 75.278 },
    { name: "Moodbidri", lat: 13.0709, lng: 74.9932 },
  ],
  Udupi: [
    { name: "Udupi", lat: 13.3409, lng: 74.7421 },
    { name: "Kundapura", lat: 13.6284, lng: 74.6902 },
    { name: "Karkala", lat: 13.2105, lng: 74.9992 },
    { name: "Brahmavar", lat: 13.4336, lng: 74.7448 },
    { name: "Kapu", lat: 13.2169, lng: 74.7333 },
    { name: "Byndoor", lat: 13.8659, lng: 74.6309 },
  ],
  Mysuru: [
    { name: "Mysuru", lat: 12.2958, lng: 76.6394 },
    { name: "Nanjangud", lat: 12.1179, lng: 76.6849 },
    { name: "Hunsur", lat: 12.3049, lng: 76.2913 },
    { name: "K R Nagar", lat: 12.4376, lng: 76.3864 },
    { name: "T Narsipura", lat: 12.2107, lng: 76.9016 },
    { name: "H D Kote", lat: 12.0898, lng: 76.3274 },
  ],
  Hassan: [
    { name: "Hassan", lat: 13.0068, lng: 76.1029 },
    { name: "Belur", lat: 13.1656, lng: 75.8652 },
    { name: "Arsikere", lat: 13.3137, lng: 76.257 },
    { name: "Sakleshpur", lat: 12.9401, lng: 75.7839 },
    { name: "Channarayapatna", lat: 12.9064, lng: 76.3884 },
    { name: "Holenarasipur", lat: 12.784, lng: 76.2432 },
  ],
  Kodagu: [
    { name: "Madikeri", lat: 12.4244, lng: 75.7382 },
    { name: "Virajpet", lat: 12.1977, lng: 75.804 },
    { name: "Somwarpet", lat: 12.5968, lng: 75.8497 },
    { name: "Kushalnagar", lat: 12.4579, lng: 75.9588 },
    { name: "Ponnampet", lat: 12.1447, lng: 75.9451 },
    { name: "Gonikoppal", lat: 12.1776, lng: 75.9311 },
  ],
  Kasaragod: [
    { name: "Kasaragod", lat: 12.5103, lng: 74.9852 },
    { name: "Kanhangad", lat: 12.3081, lng: 75.0939 },
    { name: "Nileshwar", lat: 12.2649, lng: 75.1391 },
    { name: "Manjeshwar", lat: 12.7104, lng: 74.8847 },
    { name: "Uppala", lat: 12.6819, lng: 74.9106 },
    { name: "Kumbla", lat: 12.5889, lng: 74.9442 },
  ],
  Kannur: [
    { name: "Kannur", lat: 11.8745, lng: 75.3704 },
    { name: "Thalassery", lat: 11.748, lng: 75.489 },
    { name: "Iritty", lat: 11.9867, lng: 75.6722 },
    { name: "Payyanur", lat: 12.0996, lng: 75.2045 },
    { name: "Taliparamba", lat: 12.0419, lng: 75.3616 },
    { name: "Mattannur", lat: 11.9302, lng: 75.571 },
  ],
  Wayanad: [
    { name: "Kalpetta", lat: 11.6089, lng: 76.0831 },
    { name: "Mananthavady", lat: 11.8027, lng: 76.0027 },
    { name: "Sulthan Bathery", lat: 11.6667, lng: 76.262 },
    { name: "Vythiri", lat: 11.5476, lng: 76.0389 },
    { name: "Meppadi", lat: 11.5107, lng: 76.1251 },
    { name: "Pulpally", lat: 11.7948, lng: 76.1589 },
  ],
};

export function getDistrict(stateName: string, districtName: string) {
  return STATES.find((s) => s.name === stateName)?.districts.find((d) => d.name === districtName);
}
