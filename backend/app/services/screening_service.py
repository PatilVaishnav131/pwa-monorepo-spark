"""
Mental health screening scoring service
"""
from typing import Dict, Any, Tuple

class ScreeningService:
    def __init__(self):
        # Scoring rules for different screening types
        self.scoring_rules = {
            "PHQ9": {
                "max_score": 27,
                "risk_levels": {
                    (0, 4): "minimal",
                    (5, 9): "mild", 
                    (10, 14): "moderate",
                    (15, 19): "moderate_severe",
                    (20, 27): "severe"
                }
            },
            "GAD7": {
                "max_score": 21,
                "risk_levels": {
                    (0, 4): "minimal",
                    (5, 9): "mild",
                    (10, 14): "moderate", 
                    (15, 21): "severe"
                }
            },
            "GHQ": {
                "max_score": 24,
                "risk_levels": {
                    (0, 5): "low",
                    (6, 11): "moderate",
                    (12, 24): "high"
                }
            }
        }
    
    def calculate_score(self, screening_type: str, responses: Dict[str, Any]) -> Tuple[int, str]:
        """Calculate screening score and determine risk level"""
        if screening_type not in self.scoring_rules:
            raise ValueError(f"Unknown screening type: {screening_type}")
        
        # Calculate total score based on responses
        total_score = 0
        
        if screening_type in ["PHQ9", "GAD7"]:
            # Standard 0-3 scoring for PHQ-9 and GAD-7
            for key, value in responses.items():
                if isinstance(value, int):
                    total_score += value
                elif isinstance(value, str):
                    # Convert text responses to numeric
                    score_map = {
                        "Not at all": 0,
                        "Several days": 1, 
                        "More than half the days": 2,
                        "Nearly every day": 3
                    }
                    total_score += score_map.get(value, 0)
        
        elif screening_type == "GHQ":
            # GHQ scoring (0-0-1-1 method)
            for key, value in responses.items():
                if isinstance(value, str):
                    score_map = {
                        "Better than usual": 0,
                        "Same as usual": 0,
                        "Less than usual": 1, 
                        "Much less than usual": 1
                    }
                    total_score += score_map.get(value, 0)
        
        # Determine risk level
        risk_level = self.get_risk_level(screening_type, total_score)
        
        return total_score, risk_level
    
    def get_risk_level(self, screening_type: str, score: int) -> str:
        """Determine risk level based on score"""
        rules = self.scoring_rules[screening_type]
        
        for (min_score, max_score), risk_level in rules["risk_levels"].items():
            if min_score <= score <= max_score:
                return risk_level
        
        # Default to highest risk if score exceeds ranges
        return "severe"
    
    def get_recommendations(self, screening_type: str, score: int, risk_level: str) -> Dict[str, Any]:
        """Get recommendations based on screening results"""
        recommendations = {
            "minimal": {
                "message": "Your responses suggest minimal symptoms. Continue monitoring your mental health.",
                "actions": ["Practice self-care", "Maintain healthy habits", "Stay connected with others"]
            },
            "mild": {
                "message": "Your responses suggest mild symptoms. Consider speaking with a healthcare provider.",
                "actions": ["Monitor symptoms", "Practice stress management", "Consider counseling"]
            },
            "moderate": {
                "message": "Your responses suggest moderate symptoms. We recommend speaking with a mental health professional.",
                "actions": ["Schedule appointment with counselor", "Practice coping strategies", "Reach out to support network"]
            },
            "moderate_severe": {
                "message": "Your responses suggest moderately severe symptoms. Please consider professional help soon.",
                "actions": ["Contact mental health professional", "Consider medication evaluation", "Increase support system"]
            },
            "severe": {
                "message": "Your responses suggest severe symptoms. Please seek professional help immediately.",
                "actions": ["Contact healthcare provider today", "Consider crisis support if needed", "Don't wait - get help now"]
            },
            "high": {
                "message": "Your responses suggest high distress. Please consider professional support.",
                "actions": ["Contact mental health professional", "Practice stress reduction", "Seek social support"]
            }
        }
        
        return recommendations.get(risk_level, recommendations["minimal"])