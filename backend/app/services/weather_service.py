import httpx
from typing import Dict, Any, Optional

async def get_live_weather(lat: float, lon: float) -> Optional[Dict[str, Any]]:
    # Using Open-Meteo as it doesn't require an API key
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&past_days=7&daily=precipitation_sum&timezone=auto"
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, timeout=10.0)
            if resp.status_code == 200:
                data = resp.json()
                current = data.get("current", {})
                daily = data.get("daily", {})
                
                # Approximate 7-day rainfall
                rain_7d = sum(daily.get("precipitation_sum", [])[:7]) if "precipitation_sum" in daily else current.get("precipitation", 0) * 7
                
                return {
                    "temperature_c": current.get("temperature_2m"),
                    "humidity_pct": current.get("relative_humidity_2m"),
                    "rainfall_7d_mm": rain_7d,
                    "wind_kmh": current.get("wind_speed_10m")
                }
    except Exception as e:
        print(f"Weather API error: {e}")
    return None
