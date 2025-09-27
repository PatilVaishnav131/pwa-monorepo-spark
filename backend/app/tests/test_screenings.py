"""
Test screening endpoints and scoring service
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.screening_service import ScreeningService

client = TestClient(app)

@pytest.fixture
def auth_token():
    """Get auth token for testing"""
    response = client.post("/api/v1/auth/anonymous")
    return response.json()["access_token"]

def test_get_screening_templates():
    """Test getting screening templates"""
    response = client.get("/api/v1/screenings/templates")
    assert response.status_code == 200
    
    data = response.json()
    assert "PHQ9" in data
    assert "GAD7" in data
    assert "GHQ" in data

def test_submit_phq9_screening(auth_token):
    """Test submitting PHQ-9 screening"""
    phq9_responses = {
        "q1": 1,  # Several days
        "q2": 2,  # More than half the days
        "q3": 0,  # Not at all
        "q4": 1,  # Several days
        "q5": 1,  # Several days
        "q6": 0,  # Not at all
        "q7": 1,  # Several days
        "q8": 0,  # Not at all
        "q9": 0   # Not at all
    }
    
    response = client.post(
        "/api/v1/screenings/submit",
        json={
            "screening_type": "PHQ9",
            "responses": phq9_responses
        },
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    
    data = response.json()
    assert data["screening_type"] == "PHQ9"
    assert "score" in data
    assert "risk_level" in data

def test_screening_history(auth_token):
    """Test getting screening history"""
    response = client.get(
        "/api/v1/screenings/history",
        headers={"Authorization": f"Bearer {auth_token}"}
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_screening_service_phq9():
    """Test PHQ-9 scoring service"""
    service = ScreeningService()
    
    # Test mild depression scores
    responses = {f"q{i}": 1 for i in range(1, 10)}  # All "Several days"
    score, risk_level = service.calculate_score("PHQ9", responses)
    assert score == 9
    assert risk_level == "mild"
    
    # Test severe depression scores
    responses = {f"q{i}": 3 for i in range(1, 10)}  # All "Nearly every day"
    score, risk_level = service.calculate_score("PHQ9", responses)
    assert score == 27
    assert risk_level == "severe"

def test_screening_service_gad7():
    """Test GAD-7 scoring service"""
    service = ScreeningService()
    
    # Test moderate anxiety
    responses = {f"q{i}": 2 for i in range(1, 8)}  # All "More than half the days"
    score, risk_level = service.calculate_score("GAD7", responses)
    assert score == 14
    assert risk_level == "moderate"

def test_anonymized_insights():
    """Test getting anonymized insights"""
    response = client.get("/api/v1/screenings/insights")
    assert response.status_code == 200
    
    data = response.json()
    assert "total_screenings" in data
    assert "risk_distribution" in data