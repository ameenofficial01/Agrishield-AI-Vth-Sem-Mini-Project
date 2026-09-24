from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import schemas, models
from ..dependencies import get_db, get_current_admin_user

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.get("/users")
def get_users(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_admin_user)):
    users = db.query(models.User).all()
    return [{"id": u.id, "email": u.email, "role": u.role} for u in users]

@router.get("/statistics")
def get_statistics(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_admin_user)):
    total_preds = db.query(models.PredictionHistory).count()
    risk_dist = db.query(models.PredictionHistory.risk_level, func.count(models.PredictionHistory.id)).group_by(models.PredictionHistory.risk_level).all()
    
    return {
        "total_predictions": total_preds,
        "risk_distribution": dict(risk_dist)
    }
