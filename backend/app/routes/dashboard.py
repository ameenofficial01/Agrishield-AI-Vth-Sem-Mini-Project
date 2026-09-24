from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from .. import schemas, models
from ..dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

@router.get("/summary")
def get_summary(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    total_preds = db.query(models.PredictionHistory).filter(models.PredictionHistory.user_id == current_user.id).count()
    high_risk_preds = db.query(models.PredictionHistory).filter(
        models.PredictionHistory.user_id == current_user.id,
        models.PredictionHistory.risk_level == "High"
    ).count()
    
    active_alerts = db.query(models.Alert).filter(
        models.Alert.user_id == current_user.id,
        models.Alert.status == "Active"
    ).count()
    
    return {
        "total_predictions": total_preds,
        "high_risk_predictions": high_risk_preds,
        "active_alerts": active_alerts
    }
