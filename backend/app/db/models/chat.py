"""
Chat and conversation models
"""
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from sqlalchemy.sql import func
from app.db.base import Base

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)  # Anonymous session ID
    message = Column(Text)
    response = Column(Text)
    sentiment = Column(String)  # positive, negative, neutral
    risk_detected = Column(Boolean, default=False)
    escalated = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class PeerChat(Base):
    __tablename__ = "peer_chats"
    
    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(String, index=True)
    session_id = Column(String, index=True)
    message = Column(Text)
    is_moderated = Column(Boolean, default=False)
    is_flagged = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())