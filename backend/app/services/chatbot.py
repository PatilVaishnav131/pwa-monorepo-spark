"""
AI Chatbot service for mental health first-aid
"""
import re
from typing import Tuple

class ChatbotService:
    def __init__(self):
        # Crisis keywords that trigger risk detection
        self.crisis_keywords = [
            "suicide", "kill myself", "end my life", "want to die", 
            "hurt myself", "self-harm", "cutting", "overdose",
            "hopeless", "no point", "better off dead"
        ]
        
        # Supportive responses for different scenarios
        self.responses = {
            "crisis": [
                "I'm concerned about what you're going through. You're not alone, and there are people who want to help. Please consider reaching out to a crisis helpline or emergency services.",
                "Your life has value and meaning. If you're having thoughts of self-harm, please talk to someone immediately - a counselor, trusted friend, or crisis helpline.",
                "I hear that you're in pain right now. Crisis support is available 24/7. Would you like me to provide some emergency resources?"
            ],
            "anxiety": [
                "Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Try some deep breathing exercises - inhale for 4 counts, hold for 4, exhale for 4.",
                "It's normal to feel anxious sometimes. Grounding techniques can help - try naming 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
                "Anxiety is your mind's way of trying to protect you, but sometimes it goes into overdrive. What specific situation is making you feel anxious right now?"
            ],
            "depression": [
                "Depression can make everything feel harder, but you're not alone in this. Small steps forward, even getting out of bed, are victories worth celebrating.",
                "Thank you for sharing how you're feeling. Depression is a real condition that many people experience, and it's treatable with the right support.",
                "When depression weighs heavy, sometimes just talking about it helps lighten the load. What's been the most challenging part of your day today?"
            ],
            "general": [
                "Thank you for sharing that with me. It takes courage to talk about how you're feeling. How can I best support you right now?",
                "I'm here to listen and provide support. Mental health is just as important as physical health, and seeking help is a sign of strength.",
                "Everyone goes through difficult times. What you're feeling is valid, and there are healthy ways to cope with these challenges."
            ]
        }
    
    def detect_risk_level(self, message: str) -> bool:
        """Detect if message contains crisis indicators"""
        message_lower = message.lower()
        return any(keyword in message_lower for keyword in self.crisis_keywords)
    
    def categorize_message(self, message: str) -> str:
        """Categorize the type of mental health concern"""
        message_lower = message.lower()
        
        if self.detect_risk_level(message):
            return "crisis"
        elif any(word in message_lower for word in ["anxious", "anxiety", "worry", "nervous", "panic"]):
            return "anxiety"
        elif any(word in message_lower for word in ["depressed", "depression", "sad", "hopeless", "empty"]):
            return "depression"
        else:
            return "general"
    
    def get_response(self, message: str) -> Tuple[str, bool]:
        """Generate appropriate response based on message content"""
        category = self.categorize_message(message)
        risk_detected = category == "crisis"
        
        # Get appropriate response
        import random
        response = random.choice(self.responses[category])
        
        # Add crisis resources if high risk
        if risk_detected:
            response += "\n\nImmediate help:\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911"
        
        return response, risk_detected