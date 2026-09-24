import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import json
import os

print("Loading dataset...")
df = pd.read_csv('../../AgriShield_Full_ML_Dataset_Karnataka_Kerala.csv')

features = [
    'State', 'District', 'Taluk', 'Crop', 'Pest', 
    'Temperature_C', 'Humidity_Pct', 'Rainfall_7d_mm', 
    'Wind_kmh'
]
target = 'Risk_Score'

X = df[features]
y = df[target]

print("Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=df['Risk_Level'])

categorical_features = ['State', 'District', 'Taluk', 'Crop', 'Pest']
numeric_features = ['Temperature_C', 'Humidity_Pct', 'Rainfall_7d_mm', 'Wind_kmh']

categorical_transformer = OneHotEncoder(handle_unknown='ignore')
numeric_transformer = StandardScaler()

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

print("Training model with restricted depth to reduce size...")
model = Pipeline(steps=[('preprocessor', preprocessor),
                        ('regressor', RandomForestRegressor(n_estimators=30, max_depth=15, min_samples_split=5, random_state=42, n_jobs=-1))])

model.fit(X_train, y_train)

print("Evaluating model...")
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print(f"MAE: {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"R2: {r2:.2f}")

print("Saving model...")
os.makedirs('model_artifacts', exist_ok=True)
joblib.dump(model, 'model_artifacts/risk_model.joblib', compress=3)

metadata = {
    'metrics': {
        'MAE': float(mae),
        'RMSE': float(rmse),
        'R2': float(r2)
    },
    'features': features,
    'target': target,
    'version': '1.0.1'
}
with open('model_artifacts/model_metadata.json', 'w') as f:
    json.dump(metadata, f, indent=4)
print("Done!")
