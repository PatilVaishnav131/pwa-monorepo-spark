import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">AI Mental Health Assistant</h1>
          <p className="text-muted-foreground mt-2">Get immediate support from our AI-powered mental health companion</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-gentle">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Start Your Conversation</CardTitle>
            <CardDescription>
              Our AI assistant is here to provide evidence-based mental health support and guidance.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-card border rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-4">
                The AI chat interface will be implemented here. This feature includes:
              </p>
              <ul className="text-left text-muted-foreground space-y-2 max-w-md mx-auto">
                <li>• Real-time conversation with AI assistant</li>
                <li>• Crisis detection and escalation</li>
                <li>• Evidence-based mental health guidance</li>
                <li>• Anonymous and secure conversations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;