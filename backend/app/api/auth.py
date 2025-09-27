"""
Authentication API endpoints - Anonymous JWT tokens
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from app.core.security import create_anonymous_token, verify_token

router = APIRouter()
security = HTTPBearer()

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

@router.post("/anonymous", response_model=TokenResponse)
async def create_anonymous_session():
    """Create an anonymous session token"""
    token = create_anonymous_token()
    return {"access_token": token, "token_type": "bearer"}

@router.get("/verify")
async def verify_session(token: str = Depends(security)):
    """Verify the current session token"""
    subject = verify_token(token.credentials)
    if not subject:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    return {"subject": subject, "valid": True}