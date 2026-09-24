import httpx

test_queries = [
    'Cotton', 'Coconut', 'Rice', 'Tomato', 'Maize',
    'Red palm weevil', 'Fall armyworm', 'Aphis gossypii', 'Scirpophaga incertulas'
]
headers = {'User-Agent': 'AgriShield/1.0 (agrishield@example.com)'}

for q in test_queries:
    encoded = q.replace(" ", "_")
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
    try:
        r = httpx.get(url, headers=headers, follow_redirects=True).json()
        thumb = r.get('thumbnail', {}).get('source')
        print(f"{q} -> {thumb}")
    except Exception as e:
        print(f"{q} -> ERROR: {e}")
