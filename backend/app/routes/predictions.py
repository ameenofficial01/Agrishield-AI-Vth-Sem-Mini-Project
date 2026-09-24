from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import schemas, models
from ..dependencies import get_db, get_current_user
from ..services.ml_service import ml_service
from ..services.recommendation_service import get_recommendations

router = APIRouter(prefix="/api", tags=["predictions"])

@router.post("/predict", response_model=schemas.PredictionResponse)
def create_prediction(
    req: schemas.PredictionRequest, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    # Perform prediction
    res = ml_service.predict_risk(
        req.state, req.district, req.taluk, req.crop, req.pest,
        req.temperature_c, req.humidity_pct, req.rainfall_7d_mm, req.wind_kmh
    )
    
    score = res["score"]
    level = res["level"]
    
    # Get recommendations
    adv_title, adv_body = get_recommendations(req.crop, req.pest, level)
    
    # Simple probability derivation based on score
    if level == "High":
        probs = {"low": max(0, 100 - score - 10), "medium": 10, "high": score}
    elif level == "Medium":
        probs = {"low": 100 - score, "medium": score, "high": 0}
    else:
        probs = {"low": 100 - score, "medium": score, "high": 0}

    # Normalize probs
    total = sum(probs.values())
    if total > 0:
        probs = {k: round((v / total) * 100, 1) for k, v in probs.items()}
    else:
        probs = {"low": 33.3, "medium": 33.3, "high": 33.4}
        
    # Save to history
    hist = models.PredictionHistory(
        user_id=current_user.id,
        state=req.state,
        district=req.district,
        taluk=req.taluk,
        crop=req.crop,
        pest=req.pest,
        temperature_c=req.temperature_c,
        humidity_pct=req.humidity_pct,
        rainfall_7d_mm=req.rainfall_7d_mm,
        wind_kmh=req.wind_kmh,
        risk_score=score,
        risk_level=level,
        model_version=ml_service.metadata.get("version", "1.0.0") if ml_service.metadata else "unknown"
    )
    db.add(hist)
    
    # Create personal warning if High
    if level == "High":
        alert = models.Alert(
            user_id=current_user.id,
            state=req.state,
            district=req.district,
            taluk=req.taluk,
            crop=req.crop,
            pest=req.pest,
            risk_level=level,
            message=f"High risk of {req.pest} detected for {req.crop} in {req.district}. Immediate action required.",
            status="Active"
        )
        db.add(alert)
        
    db.commit()
    db.refresh(hist)

    return {
        "id": hist.id,
        "risk_score": score,
        "risk_level": level,
        "advisory_title": adv_title,
        "advisory_body": adv_body,
        "class_probs": probs,
        "created_at": hist.created_at
    }

@router.get("/predictions", response_model=List[schemas.PredictionResponse])
def get_history(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    hists = db.query(models.PredictionHistory).filter(models.PredictionHistory.user_id == current_user.id).order_by(models.PredictionHistory.created_at.desc()).all()
    # map them to response format
    res = []
    for h in hists:
        res.append({
            "id": h.id,
            "risk_score": h.risk_score,
            "risk_level": h.risk_level,
            "advisory_title": f"Advisory for {h.pest}",
            "advisory_body": "View details for full recommendation",
            "class_probs": {"low": 33.3, "medium": 33.3, "high": 33.4},
            "created_at": h.created_at
        })
    return res
