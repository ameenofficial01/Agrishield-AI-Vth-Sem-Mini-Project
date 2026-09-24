from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    state: Optional[str] = None
    district: Optional[str] = None
    taluk: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class PredictionRequest(BaseModel):
    state: str
    district: str
    taluk: str
    crop: str
    pest: str
    temperature_c: Optional[float] = None
    humidity_pct: Optional[float] = None
    rainfall_7d_mm: Optional[float] = None
    wind_kmh: Optional[float] = None
    
class PredictionResponse(BaseModel):
    id: int
    risk_score: float
    risk_level: str
    advisory_title: str
    advisory_body: str
    class_probs: Dict[str, float]
    created_at: datetime
    class Config:
        from_attributes = True

class AlertResponse(BaseModel):
    id: int
    state: str
    district: str
    taluk: str
    crop: str
    pest: str
    risk_level: str
    message: str
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
