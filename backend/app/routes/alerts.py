from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..dependencies import get_db, get_current_user

router = APIRouter(prefix="/api", tags=["alerts"])

@router.get("/alerts", response_model=List[schemas.AlertResponse])
def get_alerts(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.Alert).filter(models.Alert.user_id == current_user.id).order_by(models.Alert.created_at.desc()).all()
