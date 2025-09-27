"""
Counselor appointment booking API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from app.db.base import get_db, Base
from app.core.security import verify_token

router = APIRouter()
security = HTTPBearer()

# Appointment model
class Appointment(Base):
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    counselor_id = Column(String, index=True)
    appointment_time = Column(DateTime)
    status = Column(String, default="scheduled")  # scheduled, confirmed, cancelled
    notes = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class CounselorProfile(Base):
    __tablename__ = "counselor_profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    counselor_id = Column(String, unique=True, index=True)
    name = Column(String)
    specialization = Column(String)
    bio = Column(String)
    available = Column(Boolean, default=True)

# Pydantic models
class AppointmentRequest(BaseModel):
    counselor_id: str
    preferred_time: datetime
    notes: Optional[str] = None

class AppointmentResponse(BaseModel):
    id: int
    counselor_id: str
    appointment_time: datetime
    status: str
    notes: Optional[str]

class CounselorInfo(BaseModel):
    counselor_id: str
    name: str
    specialization: str
    bio: str
    available: bool

@router.get("/counselors")
async def get_available_counselors(db: Session = Depends(get_db)):
    """Get list of available counselors"""
    # Demo data - in production, this would be from database
    return [
        {
            "counselor_id": "counselor_1",
            "name": "Dr. Sarah Johnson",
            "specialization": "Anxiety & Depression",
            "bio": "Licensed clinical psychologist with 10+ years experience",
            "available": True
        },
        {
            "counselor_id": "counselor_2", 
            "name": "Dr. Michael Chen",
            "specialization": "Trauma & PTSD",
            "bio": "Trauma specialist with expertise in EMDR therapy",
            "available": True
        },
        {
            "counselor_id": "counselor_3",
            "name": "Dr. Maria Rodriguez",
            "specialization": "Family & Relationships",
            "bio": "Marriage and family therapist specializing in relationship counseling",
            "available": True
        }
    ]

@router.get("/availability/{counselor_id}")
async def get_counselor_availability(
    counselor_id: str,
    days_ahead: int = 7
):
    """Get available time slots for a counselor"""
    # Demo availability - in production, this would be from a scheduling system
    available_slots = []
    start_date = datetime.now() + timedelta(days=1)
    
    for day in range(days_ahead):
        date = start_date + timedelta(days=day)
        if date.weekday() < 5:  # Monday to Friday
            for hour in [9, 10, 11, 14, 15, 16]:
                slot_time = date.replace(hour=hour, minute=0, second=0, microsecond=0)
                available_slots.append(slot_time.isoformat())
    
    return {
        "counselor_id": counselor_id,
        "available_slots": available_slots
    }

@router.post("/book", response_model=AppointmentResponse)
async def book_appointment(
    request: AppointmentRequest,
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Book an appointment with a counselor"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # In production, verify counselor availability before booking
    appointment = Appointment(
        session_id=subject,
        counselor_id=request.counselor_id,
        appointment_time=request.preferred_time,
        notes=request.notes,
        status="scheduled"
    )
    
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    
    return AppointmentResponse(
        id=appointment.id,
        counselor_id=appointment.counselor_id,
        appointment_time=appointment.appointment_time,
        status=appointment.status,
        notes=appointment.notes
    )

@router.get("/my-appointments")
async def get_my_appointments(
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Get user's scheduled appointments"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    appointments = db.query(Appointment).filter(
        Appointment.session_id == subject
    ).order_by(Appointment.appointment_time).all()
    
    return [
        {
            "id": apt.id,
            "counselor_id": apt.counselor_id,
            "appointment_time": apt.appointment_time.isoformat(),
            "status": apt.status,
            "notes": apt.notes
        }
        for apt in appointments
    ]

@router.patch("/appointments/{appointment_id}/cancel")
async def cancel_appointment(
    appointment_id: int,
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Cancel an appointment"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.session_id == subject
    ).first()
    
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    appointment.status = "cancelled"
    db.commit()
    
    return {"status": "cancelled", "appointment_id": appointment_id}