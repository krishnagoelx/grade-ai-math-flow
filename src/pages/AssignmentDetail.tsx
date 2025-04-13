
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Share2, BarChart, FileText, FileUp, Download, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AssignmentDetail, StudentAssignment } from "@/types/class";

const AssignmentDetailPage = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("results");
  
  // Mock assignment data
  const assignment: AssignmentDetail = {
    id: assignmentId || "assign-001",
    title: "Linear Equations Test",
    subject: "Algebra",
    date: "Apr 10, 2023",
    status: "active",
    completion: 68,
    maxMarks: 50,
    description: "End of chapter test on linear equations and their applications",
    rubric: "Rubric document uploaded",
    questionPaper: "Question paper uploaded",
    markingScheme: "Marking scheme uploaded",
    students: [
      {
        studentId: "ST001",
        studentName: "John Doe",
        status: "graded",
        score: 42,
        submissionUrl: "#",
        feedbackUrl: "#",
        isShared: true,
        sharedUrl: "https://example.com/results/st001"
      },
      {
        studentId: "ST002",
        studentName: "Jane Smith",
        status: "processing",
        submissionUrl: "#",
        isShared: false
      },
      {
        studentId: "ST003",
        studentName: "Robert Johnson",
        status: "failed",
        submissionUrl: "#",
        isShared: false
      },
      {
        studentId: "ST004",
        studentName: "Emily Williams",
        status: "pending",
        isShared: false
      }
    ]
  };
  
  const statusConfig = {
    "pending": { label: "Pending", color: "bg-gray-100 text-gray-800" },
    "processing": { label: "Processing", color: "bg-blue-100 text-blue-800" },
    "graded": { label: "Graded", color: "bg-green-100 text-green-800" },
    "failed": { label: "Failed", color: "bg-red-100 text-red-800" }
  };
  
  const handleUploadSheets = () => {
    toast({
      title: "Upload Student Sheets",
      description: "This would open a file upload dialog"
    });
  };
  
  const handleShareResults = () => {
    toast({
      title: "Share Results",
      description: "This would share results with all graded students"
    });
  };
  
  const handleRetryGrading = (studentId: string) => {
    toast({
      title: "Retry Grading",
      description: `Retrying grading for student ${studentId}`
    });
  };
  
  const handleShareWithStudent = (studentId: string) => {
    toast({
      title: "Results Shared",
      description: `Results have been shared with student ${studentId}`
    });
  };
  
  const handleViewFeedback = (studentId: string) => {
    toast({
      title: "View Feedback",
      description: `Viewing feedback for student ${studentId}`
    });
  };
  
  const pendingCount = assignment.students.filter(s => s.status === "pending").length;
  const processingCount = assignment.students.filter(s => s.status === "processing").length;
  const gradedCount = assignment.students.filter(s => s.status === "graded").length;
  const failedCount = assignment.students.filter(s => s.status === "failed").length;
  
  const totalStudents = assignment.students.length;
  const gradedPercentage = totalStudents > 0 ? (gradedCount / totalStudents) * 100 : 0;
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild className="p-0 h-auto">
            <Link to={`/class/${assignment.id.split('-')[0]}`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{assignment.title}</h1>
              <Badge 
                variant="outline" 
                className={
                  assignment.status === "draft" ? "bg-gray-100 text-gray-800" :
                  assignment.status === "active" ? "bg-blue-100 text-blue-800" :
                  "bg-green-100 text-green-800"
                }
              >
                {assignment.status === "draft" ? "Draft" : 
                 assignment.status === "active" ? "Active" : "Completed"}
              </Badge>
            </div>
            <p className="text-muted-foreground">{assignment.subject} • {assignment.maxMarks} marks</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {(assignment.status === "active" || assignment.status === "completed") && (
            <>
              <Button variant="outline" onClick={handleShareResults}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Results
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/assignment/${assignmentId}/analytics`}>
                  <BarChart className="mr-2 h-4 w-4" />
                  Analytics
                </Link>
              </Button>
            </>
          )}
          <Button onClick={handleUploadSheets}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Sheets
          </Button>
        </div>
      </div>
      
      {assignment.status === "active" && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Grading Progress</CardTitle>
            <CardDescription>
              {gradedCount} of {totalStudents} sheets graded
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={gradedPercentage} className="h-2 mb-4" />
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold">{pendingCount}</div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{processingCount}</div>
                <div className="text-xs text-muted-foreground">Processing</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{gradedCount}</div>
                <div className="text-xs text-muted-foreground">Graded</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{failedCount}</div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="grade">Grade</TabsTrigger>
        </TabsList>
        
        <TabsContent value="results" className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignment.students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell className="font-medium">{student.studentName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusConfig[student.status].color}>
                      {statusConfig[student.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.score !== undefined ? `${student.score}/${assignment.maxMarks}` : '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {student.status === "failed" && (
                        <Button size="sm" variant="outline" onClick={() => handleRetryGrading(student.studentId)}>
                          Retry
                        </Button>
                      )}
                      
                      {student.status === "graded" && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleViewFeedback(student.studentId)}>
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant={student.isShared ? "outline" : "default"}
                            onClick={() => handleShareWithStudent(student.studentId)}
                          >
                            {student.isShared ? "Shared" : "Share"}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Question Paper</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg">
                  {assignment.questionPaper ? (
                    <div className="text-center">
                      <FileText size={40} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium mb-4">Question Paper Uploaded</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download size={14} className="mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileUp size={40} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">Upload question paper</p>
                      <Button size="sm">Upload</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Marking Scheme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg">
                  {assignment.markingScheme ? (
                    <div className="text-center">
                      <FileText size={40} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium mb-4">Marking Scheme Uploaded</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download size={14} className="mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <FileUp size={40} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">Upload marking scheme</p>
                      <Button size="sm">Upload</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Rubric</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg">
                  {assignment.rubric ? (
                    <div className="text-center">
                      <FileText size={40} className="mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium mb-4">Rubric Uploaded</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings size={14} className="mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full">
                          <Upload size={14} className="mr-1" />
                          Upload Rubric
                        </Button>
                        <Button size="sm" className="w-full">
                          <Settings size={14} className="mr-1" />
                          Generate Rubric
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="grade" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Student Sheets</CardTitle>
              <CardDescription>
                Upload student answer sheets to be automatically graded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg">
                <FileUp size={60} className="text-muted-foreground mb-4" />
                <p className="text-sm text-center text-muted-foreground mb-6 max-w-md">
                  Drag and drop student answer sheets here, or click to browse. You can upload multiple files at once.
                </p>
                <Button onClick={handleUploadSheets}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Answer Sheets
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentDetailPage;
