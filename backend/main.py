from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth, locations, weather, predictions, alerts, dashboard, admin, model_info
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AgriShield API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(locations.router)
app.include_router(weather.router)
app.include_router(predictions.router)
app.include_router(alerts.router)
app.include_router(dashboard.router)
app.include_router(admin.router)
app.include_router(model_info.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to AgriShield API"}
