import pandas as pd
import json

df = pd.read_csv('AgriShield_Full_ML_Dataset_Karnataka_Kerala.csv')

# 1. Crops & Pests
crops = sorted(df['Crop'].unique().tolist())
crop_pests = {}
for c in crops:
    crop_pests[c] = sorted(df[df['Crop'] == c]['Pest'].unique().tolist())

all_pests = sorted(df['Pest'].unique().tolist())

# 2. States & Districts & Taluks
states = sorted(df['State'].unique().tolist())
state_districts = {}
for s in states:
    state_districts[s] = sorted(df[df['State'] == s]['District'].unique().tolist())

district_taluks = {}
for d in df['District'].unique():
    district_taluks[d] = sorted(df[df['District'] == d]['Taluk'].unique().tolist())

print(f"Loaded {len(crops)} crops, {len(all_pests)} pests, {len(states)} states, and {len(district_taluks)} districts.")

# Approximate coordinates for all 31 Karnataka and 14 Kerala districts
coords = {
    # Karnataka (31)
    "Bagalkote": {"lat": 16.18, "lng": 75.70},
    "Ballari": {"lat": 15.14, "lng": 76.92},
    "Belagavi": {"lat": 15.85, "lng": 74.50},
    "Bengaluru Rural": {"lat": 13.23, "lng": 77.57},
    "Bengaluru Urban": {"lat": 12.97, "lng": 77.59},
    "Bidar": {"lat": 17.91, "lng": 77.52},
    "Chamarajanagara": {"lat": 11.92, "lng": 76.94},
    "Chikkaballapura": {"lat": 13.43, "lng": 77.73},
    "Chikkamagaluru": {"lat": 13.32, "lng": 75.77},
    "Chitradurga": {"lat": 14.22, "lng": 76.40},
    "Dakshina Kannada": {"lat": 12.87, "lng": 75.20},
    "Davanagere": {"lat": 14.46, "lng": 75.92},
    "Dharwad": {"lat": 15.46, "lng": 75.01},
    "Gadag": {"lat": 15.43, "lng": 75.63},
    "Hassan": {"lat": 13.01, "lng": 76.10},
    "Haveri": {"lat": 14.80, "lng": 75.40},
    "Kalaburagi": {"lat": 17.33, "lng": 76.83},
    "Kodagu": {"lat": 12.42, "lng": 75.74},
    "Kolar": {"lat": 13.14, "lng": 78.13},
    "Koppal": {"lat": 15.35, "lng": 76.15},
    "Mandya": {"lat": 12.52, "lng": 76.90},
    "Mysuru": {"lat": 12.30, "lng": 76.65},
    "Raichur": {"lat": 16.20, "lng": 77.36},
    "Ramanagara": {"lat": 12.72, "lng": 77.28},
    "Shivamogga": {"lat": 13.93, "lng": 75.57},
    "Tumakuru": {"lat": 13.34, "lng": 77.10},
    "Udupi": {"lat": 13.34, "lng": 74.74},
    "Uttara Kannada": {"lat": 14.80, "lng": 74.13},
    "Vijayanagara": {"lat": 15.27, "lng": 76.39},
    "Vijayapura": {"lat": 16.83, "lng": 75.71},
    "Yadgir": {"lat": 16.77, "lng": 77.14},

    # Kerala (14)
    "Alappuzha": {"lat": 9.49, "lng": 76.33},
    "Ernakulam": {"lat": 9.98, "lng": 76.30},
    "Idukki": {"lat": 9.85, "lng": 76.97},
    "Kannur": {"lat": 11.87, "lng": 75.37},
    "Kasaragod": {"lat": 12.51, "lng": 74.99},
    "Kollam": {"lat": 8.89, "lng": 76.60},
    "Kottayam": {"lat": 9.59, "lng": 76.52},
    "Kozhikode": {"lat": 11.26, "lng": 75.78},
    "Malappuram": {"lat": 11.07, "lng": 76.07},
    "Palakkad": {"lat": 10.78, "lng": 76.65},
    "Pathanamthitta": {"lat": 9.26, "lng": 76.78},
    "Thiruvananthapuram": {"lat": 8.52, "lng": 76.94},
    "Thrissur": {"lat": 10.53, "lng": 76.21},
    "Wayanad": {"lat": 11.69, "lng": 76.13}
}

# Write cropPestMap.ts
with open('src/data/cropPestMap.ts', 'w', encoding='utf-8') as f:
    f.write('import type { PestMeta } from "../types";\n\n')
    f.write(f'export const CROPS = {json.dumps(crops, indent=2)} as const;\n\n')
    f.write(f'export const CROP_PESTS: Record<string, string[]> = {json.dumps(crop_pests, indent=2)};\n\n')
    
    # Generic stage list
    stages = {c: ["Sowing", "Vegetative", "Flowering", "Fruiting", "Harvest"] for c in crops}
    f.write(f'export const CROP_STAGES: Record<string, string[]> = {json.dumps(stages, indent=2)};\n\n')
    
    pest_meta = {p: {"scientific": f"{p} spp.", "group": "Agricultural Pest"} for p in all_pests}
    f.write(f'export const PEST_META: Record<string, PestMeta> = {json.dumps(pest_meta, indent=2)};\n')

print("Generated src/data/cropPestMap.ts")

# Write locations.ts
with open('src/data/locations.ts', 'w', encoding='utf-8') as f:
    f.write('import type { StateInfo } from "../types";\n\n')
    
    states_data = []
    for s in states:
        dists_list = []
        for d in state_districts[s]:
            c = coords.get(d, {"lat": 13.0, "lng": 76.0})
            dists_list.append({"name": d, "lat": c["lat"], "lng": c["lng"]})
        states_data.append({"name": s, "districts": dists_list})
        
    f.write(f'export const STATES: StateInfo[] = {json.dumps(states_data, indent=2)};\n\n')
    
    # District meta
    d_meta = {}
    for s in states:
        for d in state_districts[s]:
            d_crops = sorted(df[df['District'] == d]['Crop'].unique().tolist())[:4]
            d_meta[d] = {
                "zone": f"{s} Agro-Zone",
                "stations": 12,
                "area": "4,500 km²",
                "majorCrops": d_crops,
                "lastSurvey": "1 day ago"
            }
    f.write(f'export const DISTRICT_META: Record<string, {{"zone": string; stations: number; area: string; majorCrops: string[]; lastSurvey: string}}> = {json.dumps(d_meta, indent=2)};\n\n')

    f.write('''export interface AreaDef {
  name: string;
  lat: number;
  lng: number;
}

''')
    areas_by_dist = {}
    for d, taluks in district_taluks.items():
        base_c = coords.get(d, {"lat": 13.0, "lng": 76.0})
        areas_by_dist[d] = []
        # offset slightly for visual separation on map
        for i, t in enumerate(taluks):
            offset_lat = ((i % 3) - 1) * 0.08
            offset_lng = ((i // 3) - 1) * 0.08
            areas_by_dist[d].append({
                "name": t,
                "lat": round(base_c["lat"] + offset_lat, 4),
                "lng": round(base_c["lng"] + offset_lng, 4)
            })
            
    f.write(f'export const AREAS_BY_DISTRICT: Record<string, AreaDef[]> = {json.dumps(areas_by_dist, indent=2)};\n\n')
    f.write('''export function getDistrict(stateName: string, districtName: string) {
  return STATES.find((s) => s.name === stateName)?.districts.find((d) => d.name === districtName);
}
''')

print("Generated src/data/locations.ts")

# Write backend/app/routes/locations.py
with open('backend/app/routes/locations.py', 'w', encoding='utf-8') as f:
    f.write('''from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/api", tags=["locations"])

STATES = ''' + json.dumps(states, indent=2) + '''
DISTRICTS = ''' + json.dumps(state_districts, indent=2) + '''
TALUKS = ''' + json.dumps(district_taluks, indent=2) + '''
CROPS = ''' + json.dumps(crops, indent=2) + '''
PESTS = ''' + json.dumps(crop_pests, indent=2) + '''

@router.get("/states", response_model=List[str])
def get_states():
    return STATES

@router.get("/districts")
def get_districts(state: str):
    return DISTRICTS.get(state, ["Other"])

@router.get("/taluks")
def get_taluks(district: str):
    return TALUKS.get(district, ["Other"])

@router.get("/crops", response_model=List[str])
def get_crops():
    return CROPS

@router.get("/pests")
def get_pests(crop: str):
    return PESTS.get(crop, ["General Pest"])
''')

print("Generated backend/app/routes/locations.py")
