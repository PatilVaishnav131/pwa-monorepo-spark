"""
Mental health screening models (PHQ-9, GAD-7, GHQ)
"""
from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base

class Screening(Base):
    __tablename__ = "screenings"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)  # Anonymous session ID
    screening_type = Column(String, index=True)  # PHQ9, GAD7, GHQ
    responses = Column(JSON)  # Store answers as JSON
    score = Column(Integer)
    risk_level = Column(String)  # low, moderate, high, severe
    completed_at = Column(DateTime(timezone=True), server_default=func.now())
    
class ScreeningTemplate(Base):
    __tablename__ = "screening_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)  # PHQ9, GAD7, GHQ
    questions = Column(JSON)  # Store questions as JSON
    scoring_rules = Column(JSON)  # Store scoring logic
    created_at = Column(DateTime(timezone=True), server_default=func.now())