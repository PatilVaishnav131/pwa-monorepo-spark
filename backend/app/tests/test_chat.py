"""
Test chat endpoints and chatbot service
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.chatbot import ChatbotService

client = TestClient(app)

@pytest.fixture
def auth_token():
    """Get auth token for testing"""
    response = client.post("/api/v1/auth/anonymous")
    return response.json()["access_token"]

def test_chat_with_ai(auth_token):
    """Test AI chat endpoint"""
    response = client.post(
        "/api/v1/chat/ai",
        json={"message": "I'm feeling anxious today"},
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    
    data = response.json()
    assert "response" in data
    assert "risk_detected" in data
    assert isinstance(data["risk_detected"], bool)

def test_chat_history(auth_token):
    """Test chat history endpoint"""
    # Send a message first
    client.post(
        "/api/v1/chat/ai",
        json={"message": "Hello"},
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    
    # Get history
    response = client.get(
        "/api/v1/chat/history",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_chatbot_risk_detection():
    """Test chatbot risk detection"""
    chatbot = ChatbotService()
    
    # Test crisis detection
    response, risk = chatbot.get_response("I want to kill myself")
    assert risk is True
    assert "crisis" in response.lower() or "help" in response.lower()
    
    # Test normal message
    response, risk = chatbot.get_response("I'm having a good day")
    assert risk is False

def test_peer_chat(auth_token):
    """Test peer chat functionality"""
    response = client.post(
        "/api/v1/chat/peer",
        json={
            "room_id": "general",
            "message": "Hello everyone"
        },
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    
    data = response.json()
    assert data["status"] == "sent"
    assert "message_id" in data