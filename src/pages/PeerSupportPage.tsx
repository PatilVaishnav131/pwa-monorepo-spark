import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, MessageSquare, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PeerSupportPage = () => {
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
          <h1 className="text-3xl font-bold text-foreground">Peer Support Community</h1>
          <p className="text-muted-foreground mt-2">Connect with others who understand your journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
          {/* Community Guidelines */}
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Community Guidelines
              </CardTitle>
              <CardDescription>
                Creating a safe space for everyone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Be kind and respectful to all community members</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Share experiences, not advice unless requested</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Respect privacy and confidentiality</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Report concerning messages to moderators</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Use content warnings for sensitive topics</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Active Groups */}
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Support Groups
              </CardTitle>
              <CardDescription>
                Moderated groups for different experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-background rounded-lg border">
                  <div className="font-medium text-foreground">Anxiety Support</div>
                  <div className="text-sm text-muted-foreground">142 members • 23 online</div>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <div className="font-medium text-foreground">Depression Support</div>
                  <div className="text-sm text-muted-foreground">98 members • 17 online</div>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <div className="font-medium text-foreground">Stress Management</div>
                  <div className="text-sm text-muted-foreground">76 members • 12 online</div>
                </div>
                <div className="p-3 bg-background rounded-lg border">
                  <div className="font-medium text-foreground">Daily Check-ins</div>
                  <div className="text-sm text-muted-foreground">203 members • 34 online</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Join Community */}
        <Card className="max-w-4xl mx-auto shadow-gentle">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-healing flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Join Our Community</CardTitle>
            <CardDescription>
              Connect with others who understand what you're going through
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-card border rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-6">
                The peer support community platform will be implemented here. Features include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                <div className="p-4 bg-background rounded-lg">
                  <div className="font-semibold text-foreground mb-2">Moderated Groups</div>
                  <div className="text-muted-foreground">Safe spaces with trained moderators</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="font-semibold text-foreground mb-2">Anonymous Sharing</div>
                  <div className="text-muted-foreground">Share experiences privately and securely</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="font-semibold text-foreground mb-2">24/7 Support</div>
                  <div className="text-muted-foreground">Community support around the clock</div>
                </div>
              </div>
              <Button size="lg" variant="secondary" className="shadow-gentle">
                Join Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PeerSupportPage;