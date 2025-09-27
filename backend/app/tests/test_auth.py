"""
Test authentication endpoints
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_anonymous_session():
    """Test anonymous session creation"""
    response = client.post("/api/v1/auth/anonymous")
    assert response.status_code == 200
    
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert len(data["access_token"]) > 0

def test_verify_valid_token():
    """Test token verification with valid token"""
    # Create token first
    auth_response = client.post("/api/v1/auth/anonymous")
    token = auth_response.json()["access_token"]
    
    # Verify token
    response = client.get(
        "/api/v1/auth/verify",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    
    data = response.json()
    assert data["valid"] is True
    assert "subject" in data

def test_verify_invalid_token():
    """Test token verification with invalid token"""
    response = client.get(
        "/api/v1/auth/verify",
        headers={"Authorization": "Bearer invalid_token"}
    )
    assert response.status_code == 401