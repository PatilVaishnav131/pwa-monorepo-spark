import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Progress } from '../components/ui/progress';
import { FileText, CheckCircle } from 'lucide-react';

const ScreeningPage: React.FC = () => {
  const [selectedScreening, setSelectedScreening] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const screeningTypes = {
    PHQ9: {
      name: 'PHQ-9 Depression Screening',
      description: 'Measures depression severity over the past 2 weeks',
      questions: [
        'Little interest or pleasure in doing things',
        'Feeling down, depressed, or hopeless',
        'Trouble falling or staying asleep, or sleeping too much',
        'Feeling tired or having little energy',
        'Poor appetite or overeating',
        'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
        'Trouble concentrating on things, such as reading the newspaper or watching television',
        'Moving or speaking so slowly that other people could have noticed',
        'Thoughts that you would be better off dead, or of hurting yourself'
      ],
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
    },
    GAD7: {
      name: 'GAD-7 Anxiety Screening',
      description: 'Measures anxiety severity over the past 2 weeks',
      questions: [
        'Feeling nervous, anxious, or on edge',
        'Not being able to stop or control worrying',
        'Worrying too much about different things',
        'Trouble relaxing',
        'Being so restless that it is hard to sit still',
        'Becoming easily annoyed or irritable',
        'Feeling afraid, as if something awful might happen'
      ],
      options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day']
    }
  };

  const startScreening = (type: string) => {
    setSelectedScreening(type);
    setCurrentQuestion(0);
    setResponses({});
    setIsCompleted(false);
  };

  const handleResponse = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [`q${currentQuestion + 1}`]: value
    }));
  };

  const nextQuestion = () => {
    const screening = screeningTypes[selectedScreening as keyof typeof screeningTypes];
    if (currentQuestion < screening.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeScreening();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const completeScreening = () => {
    // Calculate score (simplified for demo)
    const score = Object.values(responses).reduce((total, response) => {
      const scoreMap = { 'Not at all': 0, 'Several days': 1, 'More than half the days': 2, 'Nearly every day': 3 };
      return total + (scoreMap[response as keyof typeof scoreMap] || 0);
    }, 0);

    let riskLevel = 'minimal';
    if (selectedScreening === 'PHQ9') {
      if (score >= 20) riskLevel = 'severe';
      else if (score >= 15) riskLevel = 'moderate-severe';
      else if (score >= 10) riskLevel = 'moderate';
      else if (score >= 5) riskLevel = 'mild';
    } else if (selectedScreening === 'GAD7') {
      if (score >= 15) riskLevel = 'severe';
      else if (score >= 10) riskLevel = 'moderate';
      else if (score >= 5) riskLevel = 'mild';
    }

    setResults({ score, riskLevel, type: selectedScreening });
    setIsCompleted(true);
  };

  const resetScreening = () => {
    setSelectedScreening(null);
    setCurrentQuestion(0);
    setResponses({});
    setIsCompleted(false);
    setResults(null);
  };

  if (isCompleted && results) {
    return (
      <div className="min-h-screen bg-gradient-calm p-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-gentle">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-healing flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Screening Complete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{screeningTypes[results.type as keyof typeof screeningTypes].name}</h3>
                <div className="text-3xl font-bold text-primary">{results.score} points</div>
                <div className="text-muted-foreground capitalize">{results.riskLevel.replace('-', ' ')} level</div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">What this means:</h4>
                <p className="text-sm text-muted-foreground">
                  {results.riskLevel === 'minimal' && 'Your responses suggest minimal symptoms. Continue monitoring your mental health.'}
                  {results.riskLevel === 'mild' && 'Your responses suggest mild symptoms. Consider speaking with a healthcare provider.'}
                  {results.riskLevel === 'moderate' && 'Your responses suggest moderate symptoms. We recommend speaking with a mental health professional.'}
                  {results.riskLevel === 'moderate-severe' && 'Your responses suggest moderately severe symptoms. Please consider professional help soon.'}
                  {results.riskLevel === 'severe' && 'Your responses suggest severe symptoms. Please seek professional help immediately.'}
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={resetScreening} variant="outline" className="flex-1">
                  Take Another Assessment
                </Button>
                <Button className="flex-1">
                  Book Counselor Session
                </Button>
              </div>

              {results.riskLevel !== 'minimal' && (
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm font-medium">Need immediate support?</p>
                  <p className="text-xs mt-1">Crisis Hotline: 988 • Text HOME to 741741</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedScreening) {
    const screening = screeningTypes[selectedScreening as keyof typeof screeningTypes];
    const progress = ((currentQuestion + 1) / screening.questions.length) * 100;
    const currentResponse = responses[`q${currentQuestion + 1}`];

    return (
      <div className="min-h-screen bg-gradient-calm p-6">
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-gentle">
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-xl">{screening.name}</CardTitle>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {screening.questions.length}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Over the last 2 weeks, how often have you been bothered by:
                </h3>
                <p className="text-foreground font-medium">
                  {screening.questions[currentQuestion]}
                </p>
              </div>

              <RadioGroup value={currentResponse} onValueChange={handleResponse}>
                {screening.options.map((option, index) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex gap-4">
                <Button
                  onClick={prevQuestion}
                  variant="outline"
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!currentResponse}
                  className="flex-1"
                >
                  {currentQuestion === screening.questions.length - 1 ? 'Complete' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mental Health Screenings
          </h1>
          <p className="text-muted-foreground">
            Take standardized assessments to understand your mental health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(screeningTypes).map(([key, screening]) => (
            <Card key={key} className="shadow-gentle hover:shadow-healing transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{screening.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {screening.description}
                </p>
                <div className="text-sm">
                  <p className="font-medium">Questions: {screening.questions.length}</p>
                  <p className="text-muted-foreground">Time: ~5 minutes</p>
                </div>
                <Button 
                  onClick={() => startScreening(key)}
                  className="w-full"
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-card rounded-lg shadow-gentle">
          <h3 className="font-semibold mb-2">Important Information</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• These screenings are for educational purposes and not a substitute for professional diagnosis</li>
            <li>• Your responses are completely anonymous and confidential</li>
            <li>• If you score in higher risk categories, consider speaking with a mental health professional</li>
            <li>• For immediate help, contact the crisis hotline: 988</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScreeningPage;