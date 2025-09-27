import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowLeft, TrendingUp, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";

const InsightsPage = () => {
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
          <h1 className="text-3xl font-bold text-foreground">Personal Insights</h1>
          <p className="text-muted-foreground mt-2">Track your mental health journey with personalized data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {/* Progress Overview */}
          <Card className="shadow-gentle">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your mental health scores over time
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">+15%</div>
              <div className="text-sm text-muted-foreground">Improvement this month</div>
            </CardContent>
          </Card>

          {/* Assessment History */}
          <Card className="shadow-gentle">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-healing flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Assessment History</CardTitle>
              <CardDescription>
                Track your screening results
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Assessments completed</div>
            </CardContent>
          </Card>

          {/* Goals Progress */}
          <Card className="shadow-gentle">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Goals Progress</CardTitle>
              <CardDescription>
                Track your wellness objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">3/5</div>
              <div className="text-sm text-muted-foreground">Goals achieved</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Card className="max-w-6xl mx-auto shadow-gentle">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Detailed Analytics
            </CardTitle>
            <CardDescription>
              Comprehensive view of your mental health data
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="bg-card border rounded-lg p-6 text-center">
              <p className="text-muted-foreground mb-6">
                The personal insights dashboard will be implemented here. Features include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-6">
                <div className="p-4 bg-background rounded-lg">
                  <div className="font-semibold text-foreground mb-2">Mood Tracking</div>
                  <div className="text-muted-foreground">Daily mood patterns and trends</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="font-semibold text-foreground mb-2">Assessment Scores</div>
                  <div className="text-muted-foreground">PHQ-9, GAD-7, and GHQ results</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="font-semibold text-foreground mb-2">Session Notes</div>
                  <div className="text-muted-foreground">Therapy session insights</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="font-semibold text-foreground mb-2">Recommendations</div>
                  <div className="text-muted-foreground">Personalized wellness tips</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-background rounded-lg">
                  <h4 className="font-semibold text-foreground mb-4">Recent Activities</h4>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">PHQ-9 Assessment</span>
                      <span className="text-foreground">Score: 8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">AI Chat Session</span>
                      <span className="text-foreground">45 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Therapy Session</span>
                      <span className="text-foreground">50 min</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-background rounded-lg">
                  <h4 className="font-semibold text-foreground mb-4">Wellness Recommendations</h4>
                  <div className="space-y-3 text-left text-sm text-muted-foreground">
                    <div>• Continue daily mood tracking</div>
                    <div>• Schedule weekly therapy sessions</div>
                    <div>• Practice mindfulness exercises</div>
                    <div>• Maintain sleep hygiene routine</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPage;