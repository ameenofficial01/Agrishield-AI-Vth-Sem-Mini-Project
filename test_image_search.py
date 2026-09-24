import httpx

def search_crop_or_pest_image(query: str, scientific: str = None) -> str:
    headers = {"User-Agent": "AgriShield-AI/1.0 (agrishield.ai@edu.in)"}
    
    candidates = []
    if scientific:
        candidates.append(scientific)
    candidates.append(query)
    # Also add "plant" for crops or "insect" for pests if needed
    
    for term in candidates:
        encoded = term.strip().replace(" ", "_")
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
        try:
            r = httpx.get(url, headers=headers, timeout=5.0, follow_redirects=True)
            if r.status_code == 200:
                data = r.json()
                thumb = data.get("thumbnail", {}).get("source") or data.get("originalimage", {}).get("source")
                if thumb:
                    return thumb
        except Exception:
            continue
            
    return ""

test_items = [
    ("Cotton", None),
    ("Coconut", None),
    ("Rice", None),
    ("Cotton Aphid", "Aphis gossypii"),
    ("Red Palm Weevil", "Rhynchophorus ferrugineus"),
    ("Fall Armyworm", "Spodoptera frugiperda"),
    ("Whitefly", "Bemisia tabaci"),
    ("Yellow Stem Borer", "Scirpophaga incertulas"),
]

for name, sci in test_items:
    img = search_crop_or_pest_image(name, sci)
    print(f"{name} -> {img}")
