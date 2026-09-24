from fastapi import APIRouter
from ..services.ml_service import ml_service

router = APIRouter(prefix="/api/model", tags=["model"])

@router.get("/info")
def get_model_info():
    if ml_service.metadata:
        return ml_service.metadata
    return {"status": "Model not loaded"}
