from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="farmer") # 'farmer' or 'admin'
    state = Column(String)
    district = Column(String)
    taluk = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    predictions = relationship("PredictionHistory", back_populates="user")
    alerts = relationship("Alert", back_populates="user")

class PredictionHistory(Base):
    __tablename__ = "prediction_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    state = Column(String)
    district = Column(String)
    taluk = Column(String)
    crop = Column(String)
    pest = Column(String)
    temperature_c = Column(Float)
    humidity_pct = Column(Float)
    rainfall_7d_mm = Column(Float)
    wind_kmh = Column(Float)
    risk_score = Column(Float)
    risk_level = Column(String)
    model_version = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="predictions")

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    state = Column(String)
    district = Column(String)
    taluk = Column(String)
    crop = Column(String)
    pest = Column(String)
    risk_level = Column(String)
    message = Column(String)
    status = Column(String, default="Active") # Active, Resolved
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="alerts")
