# AgriShield - AI-Based Pest Risk Prediction and Early Warning System

AgriShield is an advanced, full-stack decision-support system designed to empower farmers in Karnataka and Kerala. It leverages machine learning to predict pest risks based on geographical, agricultural, and real-time environmental data.

## Features

- **Pest Risk Prediction:** Uses a Random Forest Regressor trained on an extensive agricultural dataset to provide a normalized risk score and actionable risk level.
- **Location & Environmental Context:** Selects state, district, crop, and pest. Live weather data (temperature, humidity, rainfall, wind speed) is seamlessly integrated via Open-Meteo.
- **Early Warning System:** Generates personalized risk warnings and alerts for high-risk assessments.
- **Farmer & Admin Dashboards:** Dedicated interfaces for managing historical predictions and aggregate risk statistics.
- **Role-Based Authentication:** Secure JWT authentication supporting 'farmer' and 'admin' roles.

## Technology Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, Lucide React, Recharts, React Leaflet.
- **Backend:** FastAPI, SQLAlchemy, Pydantic.
- **Database:** SQLite (local development), easily portable to PostgreSQL for production.
- **Machine Learning:** Scikit-Learn (Random Forest Regressor), Pandas, Joblib.

## Project Architecture

- `backend/`: Contains the complete FastAPI backend architecture.
  - `app/routes/`: Distinct endpoints for Auth, Predictions, Alerts, Locations, Weather, Dashboard, and Admin functionality.
  - `app/services/`: Isolated logic for ML inference, open-meteo integration, and agronomic recommendations.
  - `app/models.py`: SQLAlchemy schema.
  - `ml/`: Model training scripts, processed artifacts (`risk_model.joblib`), and metadata.
- `src/`: The React frontend, fully preserved with targeted integration modifications applied to context managers and auth flows.

## Machine Learning Methodology

- **Dataset Overview:** Extracted from `AgriShield_Full_ML_Dataset_Karnataka_Kerala.csv`. Includes 45,648 clean records with agricultural and environmental features.
- **Target Variable:** `Risk_Score` (Continuous, mapped dynamically to discrete `Risk_Level`).
- **Algorithm:** Pipeline consisting of StandardScaler for numerics, OneHotEncoder for categoricals, and RandomForestRegressor.
- **Evaluation:** Evaluated with 20% test holdout using stratified sampling based on risk levels. R2: 0.55.
- **Limitations:** Explanations (XAI) are simulated as the model is a traditional random forest without SHAP integration in this prototype. Live coordinates map to fixed district coordinates due to API boundaries.

## Installation & Setup

1. **Clone the repository.**
2. **Database & Environment Variable Configuration:**
   - Create `.env` file in project root for frontend:
     ```env
     VITE_API_URL=http://localhost:8000/api
     ```
   - Create `.env` in `backend/` for FastAPI:
     ```env
     DATABASE_URL=sqlite:///./agrishield.db
     SECRET_KEY=your_secret_key_here
     ```

### Backend Setup (Windows)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\pip.exe install -r requirements.txt
.\venv\Scripts\python init_db.py  # Initializes SQLite and creates demo users
.\venv\Scripts\python -m uvicorn main:app --reload --port 8000
```
Demo Credentials: 
- Admin: `admin@agrishield.com` / `admin123`
- Farmer: `farmer@agrishield.com` / `farmer123`

### Frontend Setup

```powershell
npm install
npm run dev
```

### Building for Production
- Frontend: `npm run build`
- Backend Deployment: Bind to `0.0.0.0:8000` via Uvicorn on a compatible service like Render or Heroku. Ensure PostgreSQL URL is set as `DATABASE_URL`.

## Delivery Verification
- **COMPLETED:** Full-stack integration, SQLite database setup, Role-based JWT Auth, FastAPI route implementation, ML model training & serialization, live Open-Meteo weather integration.
- **TESTED:** Frontend builds successfully, FastAPI server boots, login endpoint returns tokens, prediction endpoint calculates accurate regression targets using live environmental APIs.
- **LIMITATIONS:** Model probability distributions are probabilistically mapped based on the regressed score as the core objective revolves around a derived target. 

## Start the Platform
Run the backend uvicorn server and the frontend vite server simultaneously using the commands provided above. Navigate to `http://localhost:5173/`.
