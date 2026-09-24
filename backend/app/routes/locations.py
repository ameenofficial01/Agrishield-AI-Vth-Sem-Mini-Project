from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/api", tags=["locations"])

# Mocked from dataset for simplicity. In a real app, query DB.
STATES = ["Karnataka", "Kerala"]

DISTRICTS = {
    "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi", "Ballari"],
    "Kerala": ["Thiruvananthapuram", "Ernakulam", "Kozhikode", "Thrissur", "Malappuram", "Kollam"]
}

TALUKS = {
    "Bengaluru": ["Bengaluru North", "Bengaluru South", "Bengaluru East", "Bengaluru West"],
    "Mysuru": ["Mysuru", "Nanjangud", "T Narsipura"],
    "Thiruvananthapuram": ["Thiruvananthapuram", "Neyyattinkara", "Nedumangad"],
    "Ernakulam": ["Kochi", "Kanayannur", "Aluva"],
}

CROPS = ["Rice", "Wheat", "Maize", "Cotton", "Sugarcane", "Tomato", "Potato", "Onion"]
PESTS = {
    "Rice": ["Stem Borer", "Leaf Folder", "Brown Planthopper", "Gall Midge"],
    "Wheat": ["Aphids", "Termites", "Rust", "Smut"],
    "Maize": ["Fall Armyworm", "Stem Borer", "Shoot Fly"],
    "Tomato": ["Fruit Borer", "Whitefly", "Leaf Miner"],
    "Cotton": ["Bollworm", "Whitefly", "Aphids", "Thrips"]
}

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
