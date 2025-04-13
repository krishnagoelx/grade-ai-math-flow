
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, ArrowLeft, Save, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { QuestionList, Question } from "@/components/Assignment/QuestionList";
import { RubricBuilder, RubricCriteria } from "@/components/Assignment/RubricBuilder";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const CreateAssignment = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [instructions, setInstructions] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [rubricCriteria, setRubricCriteria] = useState<{ [questionId: string]: RubricCriteria[] }>({});
  
  const { toast } = useToast();
  
  const selectedQuestion = questions.find(q => q.id === selectedQuestionId);
  
  const handleAddQuestionPaper = () => {
    // Simulate auto-splitting questions
    setTimeout(() => {
      setQuestions([
        {
          id: "q1",
          questionText: "Solve the quadratic equation: 2x² + 5x - 3 = 0",
          maxMarks: 10,
          order: 1
        },
        {
          id: "q2",
          questionText: "Find the derivative of f(x) = x³ + 2x² - 5x + 7",
          maxMarks: 8,
          order: 2
        },
        {
          id: "q3",
          questionText: "If the probability of an event is 0.4, what is the probability of its complement?",
          maxMarks: 5,
          order: 3
        }
      ]);
      
      toast({
        title: "Question Paper Processed",
        description: "3 questions have been extracted from the uploaded paper.",
      });
    }, 1000);
  };
  
  const handleQuestionsUpdated = (updatedQuestions: Question[]) => {
    setQuestions(updatedQuestions);
    
    // If we delete the selected question, clear the selection
    if (selectedQuestionId && !updatedQuestions.find(q => q.id === selectedQuestionId)) {
      setSelectedQuestionId(null);
    }
  };
  
  const handleCriteriaUpdate = (questionId: string, criteria: RubricCriteria[]) => {
    setRubricCriteria(prev => ({
      ...prev,
      [questionId]: criteria
    }));
  };
  
  const handleSaveAssignment = () => {
    const isRubricComplete = questions.every(q => 
      rubricCriteria[q.id] && rubricCriteria[q.id].length > 0
    );
    
    if (!title) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for the assignment.",
        variant: "destructive",
      });
      setActiveTab("details");
      return;
    }
    
    if (questions.length === 0) {
      toast({
        title: "Missing Questions",
        description: "Please add at least one question to the assignment.",
        variant: "destructive",
      });
      setActiveTab("questions");
      return;
    }
    
    if (!isRubricComplete) {
      toast({
        title: "Incomplete Rubric",
        description: "Please define rubric criteria for all questions.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save to the backend
    toast({
      title: "Assignment Created",
      description: "The assignment has been saved successfully.",
    });
  };
  
  const navigateToTab = (tab: string) => {
    // Validate current tab before navigating
    if (activeTab === "details" && tab === "questions") {
      if (!title) {
        toast({
          title: "Missing Information",
          description: "Please provide a title for the assignment.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (activeTab === "questions" && tab === "rubric") {
      if (questions.length === 0) {
        toast({
          title: "Missing Questions",
          description: "Please add at least one question to the assignment.",
          variant: "destructive",
        });
        return;
      }
      
      // Auto-select the first question if none is selected
      if (!selectedQuestionId && questions.length > 0) {
        setSelectedQuestionId(questions[0].id);
      }
    }
    
    setActiveTab(tab);
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
            <h1 className="text-3xl font-bold tracking-tight">Create Assignment</h1>
            <p className="text-muted-foreground">Set up a new assignment for grading</p>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Assignment Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="rubric">Rubric</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="py-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Information</CardTitle>
              <CardDescription>
                Enter the basic details for this assignment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Midterm Exam, Quiz 1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="e.g., Mathematics, Algebra"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions (Optional)</Label>
                <Textarea 
                  id="instructions" 
                  placeholder="Enter any instructions or notes for this assignment"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input 
                  id="dueDate" 
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={() => navigateToTab("questions")}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="questions" className="py-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Question Paper</CardTitle>
                <CardDescription>
                  Upload your question paper to automatically extract questions, or add them manually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="upload-dropzone">
                  <FileUp size={32} className="mb-2" />
                  <p className="mb-2 text-sm font-medium">Drag & drop your question paper here</p>
                  <p className="text-xs mb-4">Supports PDF, Word, and image files</p>
                  <Button variant="secondary" onClick={handleAddQuestionPaper}>
                    Upload Question Paper
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <QuestionList 
              questions={questions} 
              onQuestionsUpdated={handleQuestionsUpdated} 
            />
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => navigateToTab("details")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={() => navigateToTab("rubric")}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="rubric" className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Questions</CardTitle>
                <CardDescription>
                  Select a question to define its rubric
                </CardDescription>
              </CardHeader>
              <CardContent>
                {questions.length > 0 ? (
                  <div className="space-y-2">
                    {questions.map((question) => (
                      <div 
                        key={question.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          selectedQuestionId === question.id 
                            ? "border-primary bg-primary/5" 
                            : "hover:border-primary"
                        }`}
                        onClick={() => setSelectedQuestionId(question.id)}
                      >
                        <div className="font-medium">Question {question.order}</div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {question.questionText}
                        </p>
                        {rubricCriteria[question.id] && (
                          <div className="text-xs text-primary mt-1">
                            {rubricCriteria[question.id].length} criteria defined
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No questions added yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigateToTab("questions")}
                    >
                      Add Questions
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="lg:col-span-2">
              {selectedQuestion ? (
                <RubricBuilder 
                  questionId={selectedQuestion.id}
                  criteria={rubricCriteria[selectedQuestion.id] || []}
                  onCriteriaUpdate={(criteria) => handleCriteriaUpdate(selectedQuestion.id, criteria)}
                />
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <p className="text-muted-foreground mb-4">Select a question to define its rubric</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedQuestionId(questions[0]?.id || null)}
                      disabled={questions.length === 0}
                    >
                      Select Question
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => navigateToTab("questions")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleSaveAssignment}>
              <Save className="mr-2 h-4 w-4" />
              Save Assignment
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateAssignment;
