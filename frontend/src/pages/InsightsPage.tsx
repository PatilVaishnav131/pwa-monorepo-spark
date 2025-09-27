import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Heart,
  Activity,
  Target,
  Award,
  Clock
} from 'lucide-react';

const InsightsPage: React.FC = () => {
  // Mock data - in real app, this would come from API
  const weeklyData = [
    { day: 'Mon', mood: 7, anxiety: 3, sleep: 8 },
    { day: 'Tue', mood: 6, anxiety: 4, sleep: 7 },
    { day: 'Wed', mood: 8, anxiety: 2, sleep: 9 },
    { day: 'Thu', mood: 5, anxiety: 6, sleep: 6 },
    { day: 'Fri', mood: 7, anxiety: 3, sleep: 8 },
    { day: 'Sat', mood: 9, anxiety: 1, sleep: 9 },
    { day: 'Sun', mood: 8, anxiety: 2, sleep: 8 }
  ];

  const screeningHistory = [
    { date: '2024-01-15', type: 'PHQ-9', score: 8, level: 'Mild' },
    { date: '2024-01-01', type: 'GAD-7', score: 12, level: 'Moderate' },
    { date: '2023-12-15', type: 'PHQ-9', score: 12, level: 'Moderate' }
  ];

  const goals = [
    { title: 'Practice mindfulness daily', progress: 85, streak: 6 },
    { title: 'Get 8 hours of sleep', progress: 70, streak: 4 },
    { title: 'Exercise 3x per week', progress: 60, streak: 2 },
    { title: 'Journal before bed', progress: 45, streak: 3 }
  ];

  const currentMood = 7.3;
  const weeklyMoodTrend = +12;

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Mental Health Insights
          </h1>
          <p className="text-muted-foreground">
            Track your progress and discover patterns in your mental wellness journey
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Current Mood</p>
                  <p className="text-2xl font-bold">{currentMood}/10</p>
                  <p className={`text-xs flex items-center gap-1 mt-1 ${weeklyMoodTrend > 0 ? 'text-accent' : 'text-warning'}`}>
                    <TrendingUp className="h-3 w-3" />
                    {weeklyMoodTrend > 0 ? '+' : ''}{weeklyMoodTrend}% this week
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-healing flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Sessions Attended</p>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground mt-1">2 this month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Current Streak</p>
                  <p className="text-2xl font-bold">12 days</p>
                  <p className="text-xs text-accent mt-1">Keep it up!</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-healing flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-gentle">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Weekly Activity</p>
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-xs text-muted-foreground mt-1">3h 30m avg/day</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Mood Chart */}
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Weekly Mood Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day) => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{day.day}</span>
                      <span className="text-muted-foreground">Mood: {day.mood}/10</span>
                    </div>
                    <Progress value={day.mood * 10} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Screening History */}
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Screening History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {screeningHistory.map((screening, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <div className="font-medium">{screening.type}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(screening.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{screening.score} points</div>
                      <Badge 
                        variant={screening.level === 'Mild' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {screening.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals and Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Wellness Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{goal.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                      <Badge variant="outline" className="text-xs">
                        {goal.streak} day streak
                      </Badge>
                    </div>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <div className="h-10 w-10 rounded-full bg-gradient-healing flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">First Week Complete!</div>
                  <div className="text-sm text-muted-foreground">You've completed your first week of daily check-ins</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Mood Improver</div>
                  <div className="text-sm text-muted-foreground">Your mood has improved 15% this week!</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="h-10 w-10 rounded-full bg-gradient-healing flex items-center justify-center">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">Early Bird</div>
                  <div className="text-sm text-muted-foreground">5 days of morning meditation completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights and Recommendations */}
        <Card className="shadow-gentle mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Personal Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">What's Working Well:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Your mood improves significantly on days you exercise
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Consistent sleep schedule correlates with better mental health scores
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Regular therapy sessions are showing positive impact
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Areas for Growth:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-warning"></div>
                    Consider adding mindfulness practice on high-stress days
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-warning"></div>
                    Weekends show lower mood - try scheduling pleasant activities
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-warning"></div>
                    Journaling consistency could help track progress better
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPage;