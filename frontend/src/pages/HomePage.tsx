import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Heart, MessageCircle, FileText, Calendar, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-ocean px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <Heart className="mx-auto h-16 w-16 text-white/90 gentle-pulse" />
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight">
            Your Mental Health
            <span className="block text-primary-glow">Matters</span>
          </h1>
          <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">
            Sahara provides AI-powered mental health support, standardized screenings, 
            peer connection, and professional counseling - all in a safe, anonymous environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="shadow-gentle">
              <Link to="/chat">Start Talking Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
              <Link to="/screening">Take Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Mental Health Support
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access evidence-based tools and support whenever you need them, 
              with complete privacy and anonymity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Chat Support */}
            <Card className="shadow-gentle hover:shadow-healing transition-all duration-300 border-0">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">AI Mental Health Assistant</CardTitle>
                <CardDescription>
                  Get immediate support from our AI-powered mental health companion, 
                  trained to provide evidence-based first aid.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/chat">Start Chatting</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mental Health Screenings */}
            <Card className="shadow-gentle hover:shadow-healing transition-all duration-300 border-0">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-healing flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Mental Health Screenings</CardTitle>
                <CardDescription>
                  Take standardized assessments (PHQ-9, GAD-7, GHQ) to understand 
                  your mental health and track progress over time.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/screening">Take Assessment</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Counselor Booking */}
            <Card className="shadow-gentle hover:shadow-healing transition-all duration-300 border-0">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Professional Counseling</CardTitle>
                <CardDescription>
                  Connect with licensed mental health professionals for 
                  personalized therapy and counseling sessions.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/appointments">Book Session</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Peer Support */}
            <Card className="shadow-gentle hover:shadow-healing transition-all duration-300 border-0">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-healing flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Peer Support Community</CardTitle>
                <CardDescription>
                  Join moderated support groups where you can share experiences 
                  and receive encouragement from others on similar journeys.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/peer-support">Join Community</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="shadow-gentle hover:shadow-healing transition-all duration-300 border-0 md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Personal Insights</CardTitle>
                <CardDescription>
                  Track your mental health journey with personalized insights, 
                  progress charts, and wellness recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/insights">View Insights</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Crisis Support Section */}
      <section className="px-6 py-12 bg-gradient-calm">
        <div className="mx-auto max-w-4xl text-center">
          <div className="p-8 rounded-2xl bg-card shadow-warm border border-warning/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need Immediate Help?
            </h3>
            <p className="text-muted-foreground mb-6">
              If you're having thoughts of self-harm or suicide, please reach out for immediate support:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-background rounded-lg">
                <div className="font-semibold text-foreground">Crisis Hotline</div>
                <div className="text-primary font-mono">988</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="font-semibold text-foreground">Crisis Text Line</div>
                <div className="text-primary font-mono">Text HOME to 741741</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="font-semibold text-foreground">Emergency</div>
                <div className="text-primary font-mono">911</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;