"""
Mental health screening API endpoints (PHQ-9, GAD-7, GHQ)
"""
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict, Any
from app.db.base import get_db
from app.db.models.screening import Screening, ScreeningTemplate
from app.services.screening_service import ScreeningService
from app.core.security import verify_token

router = APIRouter()
security = HTTPBearer()

class ScreeningRequest(BaseModel):
    screening_type: str  # PHQ9, GAD7, GHQ
    responses: Dict[str, Any]

class ScreeningResult(BaseModel):
    id: int
    screening_type: str
    score: int
    risk_level: str
    completed_at: str

@router.get("/templates")
async def get_screening_templates():
    """Get available screening templates"""
    return {
        "PHQ9": {
            "name": "Patient Health Questionnaire-9",
            "description": "Measures depression severity",
            "questions": [
                "Little interest or pleasure in doing things",
                "Feeling down, depressed, or hopeless",
                "Trouble falling or staying asleep, or sleeping too much",
                "Feeling tired or having little energy",
                "Poor appetite or overeating",
                "Feeling bad about yourself",
                "Trouble concentrating on things",
                "Moving or speaking slowly or being restless",
                "Thoughts that you would be better off dead"
            ],
            "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
        },
        "GAD7": {
            "name": "Generalized Anxiety Disorder-7",
            "description": "Measures anxiety severity",
            "questions": [
                "Feeling nervous, anxious or on edge",
                "Not being able to stop or control worrying",
                "Worrying too much about different things",
                "Trouble relaxing",
                "Being so restless that it is hard to sit still",
                "Becoming easily annoyed or irritable",
                "Feeling afraid as if something awful might happen"
            ],
            "options": ["Not at all", "Several days", "More than half the days", "Nearly every day"]
        },
        "GHQ": {
            "name": "General Health Questionnaire",
            "description": "General psychological distress screening",
            "questions": [
                "Been able to concentrate on whatever you're doing",
                "Lost much sleep over worry",
                "Felt that you are playing a useful part in things",
                "Felt capable of making decisions about things",
                "Felt constantly under strain",
                "Felt you couldn't overcome your difficulties"
            ],
            "options": ["Better than usual", "Same as usual", "Less than usual", "Much less than usual"]
        }
    }

@router.post("/submit", response_model=ScreeningResult)
async def submit_screening(
    request: ScreeningRequest,
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Submit a completed screening"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Calculate score and risk level
    service = ScreeningService()
    score, risk_level = service.calculate_score(request.screening_type, request.responses)
    
    # Save screening result
    screening = Screening(
        session_id=subject,
        screening_type=request.screening_type,
        responses=request.responses,
        score=score,
        risk_level=risk_level
    )
    db.add(screening)
    db.commit()
    db.refresh(screening)
    
    return ScreeningResult(
        id=screening.id,
        screening_type=screening.screening_type,
        score=screening.score,
        risk_level=screening.risk_level,
        completed_at=screening.completed_at.isoformat()
    )

@router.get("/history")
async def get_screening_history(
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Get user's screening history"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    screenings = db.query(Screening).filter(
        Screening.session_id == subject
    ).order_by(Screening.completed_at.desc()).all()
    
    return [
        {
            "id": s.id,
            "screening_type": s.screening_type,
            "score": s.score,
            "risk_level": s.risk_level,
            "completed_at": s.completed_at.isoformat()
        }
        for s in screenings
    ]

@router.get("/insights")
async def get_anonymized_insights(db: Session = Depends(get_db)):
    """Get anonymized insights for institutional analysis"""
    # Basic aggregations - expand for full analytics
    from sqlalchemy import func
    
    insights = db.query(
        Screening.screening_type,
        Screening.risk_level,
        func.count(Screening.id).label('count')
    ).group_by(
        Screening.screening_type,
        Screening.risk_level
    ).all()
    
    return {
        "total_screenings": db.query(Screening).count(),
        "risk_distribution": [
            {
                "screening_type": insight.screening_type,
                "risk_level": insight.risk_level,
                "count": insight.count
            }
            for insight in insights
        ]
    }