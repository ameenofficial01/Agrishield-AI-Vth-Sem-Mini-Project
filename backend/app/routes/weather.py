from fastapi import APIRouter
from ..services.weather_service import get_live_weather

router = APIRouter(prefix="/api", tags=["weather"])

# Mock coordinates mapping for major districts
COORDS = {
    "Bengaluru": (12.9716, 77.5946),
    "Mysuru": (12.2958, 76.6394),
    "Thiruvananthapuram": (8.5241, 76.9366),
    "Ernakulam": (9.9816, 76.2999)
}

@router.get("/weather")
async def get_weather(district: str):
    coords = COORDS.get(district, (12.9716, 77.5946)) # Default to Bengaluru
    data = await get_live_weather(coords[0], coords[1])
    if data:
        return data
    return {
        "temperature_c": 28.0,
        "humidity_pct": 70.0,
        "rainfall_7d_mm": 10.0,
        "wind_kmh": 5.0
    }
