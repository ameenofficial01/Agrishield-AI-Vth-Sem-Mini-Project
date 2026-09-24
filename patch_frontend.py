import os

# 1. Update AppContext.tsx
app_context_path = 'src/context/AppContext.tsx'
with open(app_context_path, 'r') as f:
    content = f.read()

content = content.replace('import { DEFAULT_SELECTION, getAnalysis } from "../data/mockData";',
'''import { DEFAULT_SELECTION, getAnalysis } from "../data/mockData";
import { fetchAPI } from "../utils/api";
import { useEffect } from "react";''')

content = content.replace('  const analysis = useMemo(() => getAnalysis(selection), [selection]);',
'''  const [analysis, setAnalysis] = useState<AnalysisResult>(getAnalysis(selection));

  useEffect(() => {
    // We update local analysis state whenever selection changes to immediately show mock structure, 
    // then we fetch real predictions and overlay them.
    setAnalysis(getAnalysis(selection));
  }, [selection]);''')

content = content.replace('''  const applySelection = useCallback((s: Selection) => {
    setAnalyzing(true);
    // simulate a short model round-trip; swap with fetch() to FastAPI later
    window.setTimeout(() => {
      setSelection(s);
      setAnalyzing(false);
    }, 550);
  }, []);''',
'''  const applySelection = useCallback(async (s: Selection) => {
    setAnalyzing(true);
    try {
      const weather = await fetchAPI(`/weather?district=${s.district}`);
      const payload = {
        state: s.state,
        district: s.district,
        taluk: s.district,
        crop: s.crop,
        pest: s.pest,
        temperature_c: weather.temperature_c,
        humidity_pct: weather.humidity_pct,
        rainfall_7d_mm: weather.rainfall_7d_mm,
        wind_kmh: weather.wind_kmh
      };
      
      const res = await fetchAPI('/predict', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      setSelection(s);
      
      // Update analysis state with real predictions
      setAnalysis(prev => ({
        ...prev,
        base: Math.round(res.risk_score),
        level: res.risk_level,
        advisoryTitle: res.advisory_title,
        advisoryBody: res.advisory_body,
        classProbs: res.class_probs,
        env: [
          { label: "Current", temp: weather.temperature_c, humidity: weather.humidity_pct, rainfall: weather.rainfall_7d_mm }
        ],
        confidence: 85
      }));
      
    } catch (e) {
      console.error(e);
      setSelection(s);
    } finally {
      setAnalyzing(false);
    }
  }, []);''')

with open(app_context_path, 'w') as f:
    f.write(content)

print("Updated AppContext.tsx")
