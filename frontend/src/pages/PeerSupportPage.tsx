import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Users, Send, Shield, Heart, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  room: string;
}

interface Room {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isModerated: boolean;
}

const PeerSupportPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>('general');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Remember that healing isn't linear. Some days will be harder than others, and that's okay.",
      author: 'anonymous_user_1',
      timestamp: new Date(Date.now() - 300000),
      room: 'general'
    },
    {
      id: '2',
      content: "Thank you for sharing that. It really helped me feel less alone today.",
      author: 'anonymous_user_2',
      timestamp: new Date(Date.now() - 240000),
      room: 'general'
    },
    {
      id: '3',
      content: "Has anyone tried mindfulness meditation? I'm looking for some beginner tips.",
      author: 'anonymous_user_3',
      timestamp: new Date(Date.now() - 180000),
      room: 'general'
    }
  ]);

  const rooms: Room[] = [
    {
      id: 'general',
      name: 'General Support',
      description: 'Open discussion for all mental health topics',
      memberCount: 42,
      isModerated: true
    },
    {
      id: 'anxiety',
      name: 'Anxiety Support',
      description: 'Support group for anxiety and panic disorders',
      memberCount: 28,
      isModerated: true
    },
    {
      id: 'depression',
      name: 'Depression Support',
      description: 'Community for those dealing with depression',
      memberCount: 35,
      isModerated: true
    },
    {
      id: 'recovery',
      name: 'Recovery Journey',
      description: 'Share your recovery milestones and challenges',
      memberCount: 19,
      isModerated: true
    }
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      author: 'you',
      timestamp: new Date(),
      room: selectedRoom
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const currentRoom = rooms.find(room => room.id === selectedRoom);
  const roomMessages = messages.filter(msg => msg.room === selectedRoom);

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Peer Support Community
          </h1>
          <p className="text-muted-foreground">
            Connect with others on similar mental health journeys
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Room List */}
          <div className="lg:col-span-1">
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Support Rooms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedRoom === room.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="font-medium text-sm">{room.name}</div>
                    <div className="text-xs opacity-80 mt-1">
                      {room.memberCount} members
                    </div>
                    {room.isModerated && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        <Shield className="h-3 w-3 mr-1" />
                        Moderated
                      </Badge>
                    )}
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card className="shadow-gentle mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-accent mt-0.5" />
                  <div>
                    <div className="font-medium">Be Kind</div>
                    <div className="text-muted-foreground">Treat others with respect and empathy</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Stay Anonymous</div>
                    <div className="text-muted-foreground">Don't share personal identifying information</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MessageCircle className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <div className="font-medium">Crisis Support</div>
                    <div className="text-muted-foreground">For emergencies, call 988 or 911</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-gentle h-[600px] flex flex-col">
              <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <div className="text-lg">{currentRoom?.name}</div>
                    <div className="text-sm opacity-90">{currentRoom?.description}</div>
                  </div>
                  <div className="text-sm">
                    {currentRoom?.memberCount} members online
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {roomMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">
                          {msg.author === 'you' ? 'You' : `Anonymous ${msg.author.slice(-1)}`}
                        </span>
                        <span>{formatTime(msg.timestamp)}</span>
                      </div>
                      <div className={`p-3 rounded-lg max-w-[80%] ${
                        msg.author === 'you' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share your thoughts with the community..."
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Remember: This is a supportive space. Be kind and respectful to all members.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 p-6 bg-card rounded-lg shadow-gentle border border-warning/20">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Crisis Support Available 24/7</h3>
            <p className="text-muted-foreground text-sm mb-4">
              If you're having thoughts of self-harm or suicide, please reach out for immediate professional help.
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <div>Crisis Hotline: <span className="font-mono text-primary">988</span></div>
              <div>Text Line: <span className="font-mono text-primary">HOME to 741741</span></div>
              <div>Emergency: <span className="font-mono text-primary">911</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerSupportPage;