import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ScreeningPage = () => {
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
          <h1 className="text-3xl font-bold text-foreground">Mental Health Screenings</h1>
          <p className="text-muted-foreground mt-2">Take standardized assessments to understand your mental health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* PHQ-9 Assessment */}
          <Card className="shadow-gentle hover:shadow-healing transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle>PHQ-9</CardTitle>
              <CardDescription>
                Patient Health Questionnaire for depression screening
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">9 questions • 5 minutes</p>
              <Button variant="outline" className="w-full">
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          {/* GAD-7 Assessment */}
          <Card className="shadow-gentle hover:shadow-healing transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-healing flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle>GAD-7</CardTitle>
              <CardDescription>
                Generalized Anxiety Disorder assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">7 questions • 3 minutes</p>
              <Button variant="outline" className="w-full">
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          {/* GHQ Assessment */}
          <Card className="shadow-gentle hover:shadow-healing transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle>GHQ-12</CardTitle>
              <CardDescription>
                General Health Questionnaire for overall wellbeing
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">12 questions • 5 minutes</p>
              <Button variant="outline" className="w-full">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto mt-8 shadow-gentle">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">About Mental Health Screenings</h3>
            <p className="text-muted-foreground mb-4">
              These standardized assessments help identify symptoms and track your mental health over time. 
              All responses are anonymous and secure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="p-4 bg-background rounded-lg">
                <div className="font-semibold text-foreground mb-2">Anonymous</div>
                <div>Your responses are completely private</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="font-semibold text-foreground mb-2">Evidence-Based</div>
                <div>Clinically validated assessment tools</div>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <div className="font-semibold text-foreground mb-2">Track Progress</div>
                <div>Monitor your mental health journey</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScreeningPage;