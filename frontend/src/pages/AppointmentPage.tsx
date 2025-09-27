import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, User, Star, MessageSquare } from 'lucide-react';

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  bio: string;
  rating: number;
  availability: string[];
  image?: string;
}

const AppointmentPage: React.FC = () => {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const counselors: Counselor[] = [
    {
      id: 'counselor_1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Depression',
      bio: 'Licensed clinical psychologist with 10+ years experience in cognitive behavioral therapy and mindfulness-based interventions.',
      rating: 4.9,
      availability: ['2024-01-15T09:00', '2024-01-15T14:00', '2024-01-16T10:00', '2024-01-17T15:00']
    },
    {
      id: 'counselor_2',
      name: 'Dr. Michael Chen',
      specialization: 'Trauma & PTSD',
      bio: 'Trauma specialist with expertise in EMDR therapy, helping clients process difficult experiences and build resilience.',
      rating: 4.8,
      availability: ['2024-01-15T11:00', '2024-01-16T09:00', '2024-01-16T16:00', '2024-01-18T14:00']
    },
    {
      id: 'counselor_3',
      name: 'Dr. Maria Rodriguez',
      specialization: 'Family & Relationships',
      bio: 'Marriage and family therapist specializing in relationship counseling, communication skills, and family dynamics.',
      rating: 4.9,
      availability: ['2024-01-15T13:00', '2024-01-16T11:00', '2024-01-17T09:00', '2024-01-17T16:00']
    }
  ];

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    };
  };

  const bookAppointment = () => {
    if (selectedCounselor && selectedSlot) {
      // In real implementation, make API call to book appointment
      alert(`Appointment booked with ${selectedCounselor.name} on ${formatDateTime(selectedSlot).date} at ${formatDateTime(selectedSlot).time}`);
      setSelectedCounselor(null);
      setSelectedSlot(null);
    }
  };

  if (selectedCounselor) {
    return (
      <div className="min-h-screen bg-gradient-calm p-6">
        <div className="mx-auto max-w-4xl">
          <Button 
            onClick={() => setSelectedCounselor(null)}
            variant="ghost" 
            className="mb-6"
          >
            ← Back to Counselors
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Counselor Info */}
            <Card className="shadow-gentle">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedCounselor.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {selectedCounselor.specialization}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{selectedCounselor.rating}</span>
                  <span className="text-muted-foreground">(120+ reviews)</span>
                </div>
                <p className="text-muted-foreground">{selectedCounselor.bio}</p>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Session Details:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 50-minute session</li>
                    <li>• Secure video call</li>
                    <li>• Confidential and HIPAA compliant</li>
                    <li>• $120 per session</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Available Times */}
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Available Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedCounselor.availability.map((slot) => {
                    const { date, time } = formatDateTime(slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`w-full p-3 rounded-lg border text-left transition-colors ${
                          selectedSlot === slot
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium">{date}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {time}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedSlot && (
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Booking Summary:</h4>
                      <p className="text-sm">Session with {selectedCounselor.name}</p>
                      <p className="text-sm">{formatDateTime(selectedSlot).date} at {formatDateTime(selectedSlot).time}</p>
                      <p className="text-sm font-medium mt-2">$120</p>
                    </div>
                    
                    <Button 
                      onClick={bookAppointment}
                      className="w-full"
                    >
                      Confirm Booking
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Book a Counseling Session
          </h1>
          <p className="text-muted-foreground">
            Connect with licensed mental health professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {counselors.map((counselor) => (
            <Card key={counselor.id} className="shadow-gentle hover:shadow-healing transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{counselor.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {counselor.specialization}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{counselor.rating}</span>
                  <span className="text-muted-foreground text-sm">(120+ reviews)</span>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {counselor.bio}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{counselor.availability.length} slots available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>Secure video sessions</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setSelectedCounselor(counselor)}
                  className="w-full"
                >
                  View Availability
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-card rounded-lg shadow-gentle">
          <h3 className="font-semibold mb-4">How it works:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2">Choose Your Counselor</h4>
              <p className="text-sm text-muted-foreground">Browse our licensed professionals and find the right fit for your needs.</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2">Book Your Session</h4>
              <p className="text-sm text-muted-foreground">Select a convenient time slot and confirm your appointment.</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-medium mb-2">Start Your Session</h4>
              <p className="text-sm text-muted-foreground">Join your secure video call and begin your mental health journey.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;