import httpx
from fastapi import APIRouter
from typing import Optional

router = APIRouter(prefix="/api/images", tags=["images"])

# In-memory cache to save repeated calls and guarantee instant responses
CACHE: dict[str, str] = {
    "Cotton": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CottonPlant.JPG/640px-CottonPlant.JPG",
    "Coconut": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Cocos_nucifera_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg/640px-Cocos_nucifera_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-187.jpg",
    "Rice": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/20201102.Hengnan.Hybrid_rice_Sanyou-1.6.jpg/640px-20201102.Hengnan.Hybrid_rice_Sanyou-1.6.jpg",
    "Tomato": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/640px-Tomato_je.jpg",
    "Maize": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg/640px-Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg",
    "Banana": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas_white_background.jpg/640px-Bananas_white_background.jpg",
    "Chilli": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Red_chili_peppers.jpg/640px-Red_chili_peppers.jpg",
    "Red Palm Weevil": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Rhynchophorus_ferrugineus_MHNT.jpg/640px-Rhynchophorus_ferrugineus_MHNT.jpg",
    "Cotton Aphid": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Aphis_gossypii_252211071.jpg/640px-Aphis_gossypii_252211071.jpg",
    "Fall Armyworm": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Spodoptera_frugiperda.jpg/640px-Spodoptera_frugiperda.jpg",
    "Whitefly": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Silverleaf_whitefly.jpg/640px-Silverleaf_whitefly.jpg",
    "Yellow Stem Borer": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Scirpophaga_incertulas.jpg/640px-Scirpophaga_incertulas.jpg",
}

@router.get("/search")
async def search_image(query: str, scientific: Optional[str] = None):
    # Check cache first
    cache_key = (scientific or query).strip()
    if query in CACHE:
        return {"url": CACHE[query]}
    if cache_key in CACHE:
        return {"url": CACHE[cache_key]}

    headers = {"User-Agent": "AgriShield-AI/1.0 (agrishield.ai@edu.in)"}
    candidates = []
    if scientific:
        candidates.append(scientific)
    candidates.append(query)

    for term in candidates:
        encoded = term.strip().replace(" ", "_")
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
        try:
            async with httpx.AsyncClient() as client:
                r = await client.get(url, headers=headers, timeout=5.0, follow_redirects=True)
                if r.status_code == 200:
                    data = r.json()
                    thumb = data.get("thumbnail", {}).get("source") or data.get("originalimage", {}).get("source")
                    if thumb:
                        CACHE[query] = thumb
                        return {"url": thumb}
        except Exception:
            continue

    fallback = "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=600&q=80"
    return {"url": fallback}
