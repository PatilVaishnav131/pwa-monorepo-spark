"""
Risk escalation service for high-risk mental health situations
"""
from typing import Dict, Any, List
from datetime import datetime

class RiskEscalationService:
    def __init__(self):
        self.escalation_triggers = {
            "suicide_ideation": ["suicide", "kill myself", "end my life", "want to die"],
            "self_harm": ["hurt myself", "cut myself", "self-harm", "cutting"],
            "crisis_language": ["hopeless", "no point", "better off dead", "can't go on"],
            "substance_abuse": ["overdose", "pills", "too many", "drinking too much"]
        }
        
        self.crisis_resources = {
            "suicide_prevention": {
                "name": "National Suicide Prevention Lifeline",
                "phone": "988",
                "text": "Text HOME to 741741",
                "available": "24/7"
            },
            "crisis_text": {
                "name": "Crisis Text Line", 
                "text": "Text HOME to 741741",
                "available": "24/7"
            },
            "emergency": {
                "name": "Emergency Services",
                "phone": "911",
                "available": "24/7"
            }
        }
    
    def assess_risk_level(self, content: str, screening_scores: Dict[str, int] = None) -> str:
        """Assess risk level based on content and screening scores"""
        content_lower = content.lower()
        risk_score = 0
        
        # Check for crisis language
        for category, keywords in self.escalation_triggers.items():
            if any(keyword in content_lower for keyword in keywords):
                if category == "suicide_ideation":
                    risk_score += 10
                elif category == "self_harm":
                    risk_score += 8
                elif category == "crisis_language":
                    risk_score += 6
                elif category == "substance_abuse":
                    risk_score += 7
        
        # Factor in screening scores if available
        if screening_scores:
            for screening_type, score in screening_scores.items():
                if screening_type == "PHQ9" and score >= 15:
                    risk_score += 5
                elif screening_type == "GAD7" and score >= 15:
                    risk_score += 4
                elif screening_type == "GHQ" and score >= 12:
                    risk_score += 4
        
        # Determine risk level
        if risk_score >= 10:
            return "high"
        elif risk_score >= 6:
            return "moderate"
        elif risk_score >= 3:
            return "low"
        else:
            return "minimal"
    
    def should_escalate(self, risk_level: str, session_data: Dict[str, Any] = None) -> bool:
        """Determine if situation should be escalated"""
        if risk_level == "high":
            return True
        
        # Check for pattern of concerning behavior
        if session_data and risk_level == "moderate":
            # Look for multiple moderate risks in short time period
            recent_risks = session_data.get("recent_risk_assessments", [])
            moderate_risks_today = sum(1 for risk in recent_risks if risk.get("level") == "moderate")
            if moderate_risks_today >= 3:
                return True
        
        return False
    
    def get_escalation_actions(self, risk_level: str) -> Dict[str, Any]:
        """Get appropriate escalation actions for risk level"""
        actions = {
            "high": {
                "immediate_actions": [
                    "Display crisis resources immediately",
                    "Encourage immediate professional contact",
                    "Provide suicide prevention hotline",
                    "Log high-risk interaction for follow-up"
                ],
                "resources": [
                    self.crisis_resources["suicide_prevention"],
                    self.crisis_resources["emergency"]
                ],
                "priority": "urgent"
            },
            "moderate": {
                "immediate_actions": [
                    "Provide crisis resources", 
                    "Suggest professional support",
                    "Offer coping strategies",
                    "Schedule follow-up check-in"
                ],
                "resources": [
                    self.crisis_resources["crisis_text"],
                    self.crisis_resources["suicide_prevention"]
                ],
                "priority": "high"
            },
            "low": {
                "immediate_actions": [
                    "Provide general mental health resources",
                    "Suggest self-care strategies",
                    "Offer screening tools"
                ],
                "resources": [],
                "priority": "normal"
            },
            "minimal": {
                "immediate_actions": [
                    "Continue normal support conversation"
                ],
                "resources": [],
                "priority": "normal"
            }
        }
        
        return actions.get(risk_level, actions["minimal"])
    
    def log_escalation(self, session_id: str, risk_level: str, content: str, actions_taken: List[str]) -> Dict[str, Any]:
        """Log escalation for audit and follow-up"""
        escalation_log = {
            "session_id": session_id,
            "timestamp": datetime.utcnow().isoformat(),
            "risk_level": risk_level,
            "content_summary": content[:100] + "..." if len(content) > 100 else content,
            "actions_taken": actions_taken,
            "requires_followup": risk_level in ["high", "moderate"]
        }
        
        # In production, this would be saved to database
        # For now, return the log entry
        return escalation_log