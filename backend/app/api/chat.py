"""
Chat API endpoints - AI chatbot and peer support
"""
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from app.db.base import get_db
from app.db.models.chat import ChatMessage, PeerChat
from app.services.chatbot import ChatbotService
from app.core.security import verify_token

router = APIRouter()
security = HTTPBearer()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    risk_detected: bool
    escalated: bool

class PeerMessage(BaseModel):
    room_id: str
    message: str

@router.post("/ai", response_model=ChatResponse)
async def chat_with_ai(
    request: ChatRequest,
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Chat with AI mental health assistant"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Get AI response (stub for now)
    chatbot = ChatbotService()
    response, risk_detected = chatbot.get_response(request.message)
    
    # Save to database
    chat_record = ChatMessage(
        session_id=subject,
        message=request.message,
        response=response,
        risk_detected=risk_detected,
        escalated=False  # Will implement escalation logic
    )
    db.add(chat_record)
    db.commit()
    
    return ChatResponse(
        response=response,
        risk_detected=risk_detected,
        escalated=False
    )

@router.get("/history")
async def get_chat_history(
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Get user's chat history"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    messages = db.query(ChatMessage).filter(
        ChatMessage.session_id == subject
    ).order_by(ChatMessage.created_at.desc()).limit(50).all()
    
    return [
        {
            "message": msg.message,
            "response": msg.response,
            "created_at": msg.created_at,
            "risk_detected": msg.risk_detected
        }
        for msg in messages
    ]

@router.post("/peer")
async def send_peer_message(
    request: PeerMessage,
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Send message to peer support channel"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Save peer message
    peer_msg = PeerChat(
        room_id=request.room_id,
        session_id=subject,
        message=request.message,
        is_moderated=False  # Implement moderation logic
    )
    db.add(peer_msg)
    db.commit()
    
    return {"status": "sent", "message_id": peer_msg.id}

@router.get("/peer/{room_id}")
async def get_peer_messages(
    room_id: str,
    token: str = Depends(security),
    db: Session = Depends(get_db)
):
    """Get messages from peer support channel"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    messages = db.query(PeerChat).filter(
        PeerChat.room_id == room_id,
        PeerChat.is_flagged == False
    ).order_by(PeerChat.created_at.desc()).limit(100).all()
    
    return [
        {
            "message": msg.message,
            "created_at": msg.created_at,
            "session_id": msg.session_id[:8] + "..."  # Anonymize
        }
        for msg in messages
    ]