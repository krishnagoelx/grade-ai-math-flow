
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Send } from "lucide-react";
import { UploadSubmissions } from "@/components/Grading/UploadSubmissions";
import { GradingInterface } from "@/components/Grading/GradingInterface";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const GradingPage = () => {
  const [activeTab, setActiveTab] = useState("submissions");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [gradingProgress, setGradingProgress] = useState(0);
  const [isGradingComplete, setIsGradingComplete] = useState(false);
  const { toast } = useToast();
  
  // Mock data for a sample student submission
  const mockStudentData = {
    submissionId: "sub-123",
    studentName: "Michael Brown",
    questionNumber: currentQuestion,
    questionText: currentQuestion === 1 
      ? "Solve the quadratic equation: 2x² + 5x - 3 = 0" 
      : currentQuestion === 2 
        ? "Find the derivative of f(x) = x³ + 2x² - 5x + 7" 
        : "If the probability of an event is 0.4, what is the probability of its complement?",
    maxMarks: currentQuestion === 1 ? 10 : currentQuestion === 2 ? 8 : 5,
    criteria: [
      {
        id: "crit-1",
        title: "Mathematical Approach",
        description: "Student demonstrates a clear understanding of the mathematical concepts",
        maxPoints: 4,
        points: 0,
        feedback: ""
      },
      {
        id: "crit-2",
        title: "Logical Reasoning",
        description: "Student shows step-by-step reasoning with clear explanations",
        maxPoints: 3,
        points: 0,
        feedback: ""
      },
      {
        id: "crit-3",
        title: "Accuracy of Calculations",
        description: "All calculations are performed correctly without arithmetic errors",
        maxPoints: currentQuestion === 1 ? 3 : currentQuestion === 2 ? 1 : 2,
        points: 0,
        feedback: ""
      }
    ]
  };
  
  const totalQuestions = 3;
  
  const handleNextQuestion = () => {
    // In a real app, we would save the current grades before moving on
    if (currentQuestion < totalQuestions) {
      // Simulate saving progress
      toast({
        title: "Progress Saved",
        description: `Question ${currentQuestion} grades saved.`,
      });
      
      setCurrentQuestion(currentQuestion + 1);
      setGradingProgress(Math.round((currentQuestion / totalQuestions) * 100));
    } else {
      setIsGradingComplete(true);
      setGradingProgress(100);
      
      toast({
        title: "Grading Complete",
        description: "All questions have been graded.",
      });
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleFinishGrading = () => {
    toast({
      title: "Assignment Graded",
      description: "Grades have been submitted and shared with students.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Grading: Midterm Exam</h1>
            <p className="text-muted-foreground">Mathematics • Grade 10A</p>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="submissions">Upload Submissions</TabsTrigger>
          <TabsTrigger value="grading">Grading</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions" className="py-6">
          <UploadSubmissions />
          
          <div className="flex justify-end mt-6">
            <Button onClick={() => setActiveTab("grading")}>
              Start Grading
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="grading" className="py-6">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Grading Progress</CardTitle>
                  <CardDescription>
                    {isGradingComplete 
                      ? "All questions have been graded" 
                      : `Question ${currentQuestion} of ${totalQuestions}`}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Michael Brown</p>
                  <p className="text-xs text-muted-foreground">Student ID: ST005</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={gradingProgress} className="h-2 mb-2" />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Question 1</span>
                <span>Question 2</span>
                <span>Question 3</span>
              </div>
            </CardContent>
          </Card>
          
          <GradingInterface {...mockStudentData} />
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 1}
            >
              Previous Question
            </Button>
            
            {isGradingComplete ? (
              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button onClick={handleFinishGrading}>
                  <Send className="mr-2 h-4 w-4" />
                  Finish & Share
                </Button>
              </div>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < totalQuestions ? "Next Question" : "Complete Grading"}
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GradingPage;
