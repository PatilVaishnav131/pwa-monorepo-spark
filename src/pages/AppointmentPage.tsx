import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowLeft, Clock, Video, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const AppointmentPage = () => {
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
          <h1 className="text-3xl font-bold text-foreground">Professional Counseling</h1>
          <p className="text-muted-foreground mt-2">Connect with licensed mental health professionals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Book Your Session
                </CardTitle>
                <CardDescription>
                  Schedule a confidential session with a licensed therapist
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-card border rounded-lg p-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    The appointment booking system will be implemented here. Features include:
                  </p>
                  <ul className="text-left text-muted-foreground space-y-2 max-w-md mx-auto">
                    <li>• Calendar integration for scheduling</li>
                    <li>• Therapist profiles and specializations</li>
                    <li>• Video, phone, or in-person options</li>
                    <li>• Secure payment processing</li>
                    <li>• Appointment reminders</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Types */}
          <div className="space-y-4">
            <Card className="shadow-gentle">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Video Session</CardTitle>
                <CardDescription>
                  Face-to-face therapy from the comfort of your home
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">$120</div>
                <div className="text-sm text-muted-foreground mb-4">50 minutes</div>
                <Button variant="outline" className="w-full">
                  Select
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-healing flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Phone Session</CardTitle>
                <CardDescription>
                  Voice-only therapy for complete privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">$100</div>
                <div className="text-sm text-muted-foreground mb-4">50 minutes</div>
                <Button variant="outline" className="w-full">
                  Select
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">Crisis Support</CardTitle>
                <CardDescription>
                  Immediate support when you need it most
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground mb-4">Available now</div>
                <Button variant="secondary" className="w-full">
                  Get Help Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;