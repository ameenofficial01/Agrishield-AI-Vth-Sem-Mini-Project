import joblib
import json
import pandas as pd
import os

class MLService:
    def __init__(self):
        # We assume the server runs from backend/ directory
        model_path = os.path.join(os.path.dirname(__file__), "../../ml/model_artifacts/risk_model.joblib")
        meta_path = os.path.join(os.path.dirname(__file__), "../../ml/model_artifacts/model_metadata.json")
        
        self.model = None
        self.metadata = None
        
        try:
            self.model = joblib.load(model_path)
            with open(meta_path, 'r') as f:
                self.metadata = json.load(f)
        except Exception as e:
            print(f"Error loading model: {e}")

    def predict_risk(self, state, district, taluk, crop, pest, temp, hum, rain, wind):
        if not self.model:
            return {"score": 50, "level": "Medium"} # fallback
            
        data = {
            'State': [state],
            'District': [district],
            'Taluk': [taluk],
            'Crop': [crop],
            'Pest': [pest],
            'Temperature_C': [temp if temp is not None else 28.0],
            'Humidity_Pct': [hum if hum is not None else 70.0],
            'Rainfall_7d_mm': [rain if rain is not None else 10.0],
            'Wind_kmh': [wind if wind is not None else 5.0]
        }
        df = pd.DataFrame(data)
        
        score = self.model.predict(df)[0]
        score = max(0.0, min(100.0, float(score)))
        
        level = "Low"
        if score >= 75:
            level = "High"
        elif score >= 45:
            level = "Medium"
            
        return {"score": score, "level": level}

ml_service = MLService()
