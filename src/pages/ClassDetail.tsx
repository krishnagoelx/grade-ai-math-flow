
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft, Upload, ChevronDown, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AssignmentCard } from "@/components/Dashboard/AssignmentCard";
import { Badge } from "@/components/ui/badge";
import { StudentTable } from "@/components/Dashboard/StudentTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ClassData, Student, AssignmentSummary } from "@/types/class";

const ClassDetail = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("assignments");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Mock data for demonstration - in a real app this would be fetched based on classId
  const classData: ClassData = {
    id: classId || "class-001",
    name: "Mathematics Grade 10",
    section: "10A",
    studentCount: 32,
    students: [
      { id: "ST001", name: "John Doe", email: "john.doe@example.com", class: "10A", roll: "01" },
      { id: "ST002", name: "Jane Smith", email: "jane.smith@example.com", class: "10A", roll: "02" },
      { id: "ST003", name: "Robert Johnson", email: "robert.j@example.com", class: "10A", roll: "03" },
    ],
    assignments: [
      { 
        id: "assign-001",
        title: "Linear Equations Test", 
        subject: "Algebra", 
        date: "Apr 10, 2023", 
        status: "completed", 
        completion: 100,
        maxMarks: 50
      },
      { 
        id: "assign-002",
        title: "Probability Quiz", 
        subject: "Statistics", 
        date: "Apr 5, 2023", 
        status: "active", 
        completion: 68,
        maxMarks: 30 
      },
      { 
        id: "assign-003",
        title: "Geometry Problems", 
        subject: "Geometry", 
        date: "Mar 28, 2023", 
        status: "draft", 
        completion: 0,
        maxMarks: 25
      }
    ]
  };
  
  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const maxMarks = formData.get('maxMarks') as string;
    const dueDate = formData.get('dueDate') as string;
    
    toast({
      title: "Assignment Created",
      description: `New assignment "${title}" has been created as a draft`
    });
    
    setIsCreateDialogOpen(false);
    navigate(`/assignment/setup/${Date.now()}`);
  };
  
  const handleImportStudents = () => {
    toast({
      title: "Import Students",
      description: "Upload attendance sheet or student database"
    });
  };
  
  const handleViewStudent = (id: string) => {
    toast({
      title: "View Student",
      description: `Viewing student with ID: ${id}`,
    });
  };
  
  const draftAssignments = classData.assignments.filter(a => a.status === "draft");
  const activeAssignments = classData.assignments.filter(a => a.status === "active");
  const completedAssignments = classData.assignments.filter(a => a.status === "completed");
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild className="p-0 h-auto">
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{classData.name}</h1>
              <Badge variant="outline" className="bg-primary/10 text-primary">{classData.section}</Badge>
            </div>
            <p className="text-muted-foreground">Manage class assignments and students</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleImportStudents}>
                <Users className="mr-2 h-4 w-4" />
                Import Students
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateAssignment} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title</Label>
                  <Input id="title" name="title" placeholder="e.g., Midterm Exam" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="e.g., Algebra" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Maximum Marks</Label>
                  <Input id="maxMarks" name="maxMarks" type="number" placeholder="e.g., 100" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date (Optional)</Label>
                  <Input id="dueDate" name="dueDate" type="date" />
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="outline" type="button" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create & Setup</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="students">Students ({classData.students.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="space-y-6">
          {activeAssignments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Active Assignments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    id={assignment.id}
                    title={assignment.title}
                    subject={assignment.subject}
                    date={assignment.date}
                    status={assignment.status}
                    completion={assignment.completion}
                    maxMarks={assignment.maxMarks}
                  />
                ))}
              </div>
            </div>
          )}
          
          {draftAssignments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Drafts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    id={assignment.id}
                    title={assignment.title}
                    subject={assignment.subject}
                    date={assignment.date}
                    status={assignment.status}
                    completion={assignment.completion}
                    maxMarks={assignment.maxMarks}
                  />
                ))}
              </div>
            </div>
          )}
          
          {completedAssignments.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold tracking-tight">Completed</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedAssignments.map((assignment) => (
                  <AssignmentCard
                    key={assignment.id}
                    id={assignment.id}
                    title={assignment.title}
                    subject={assignment.subject}
                    date={assignment.date}
                    status={assignment.status}
                    completion={assignment.completion}
                    maxMarks={assignment.maxMarks}
                  />
                ))}
              </div>
            </div>
          )}
          
          {classData.assignments.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No assignments yet</h3>
              <p className="text-muted-foreground mb-6">Create your first assignment to get started</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="students">
          <StudentTable 
            students={classData.students} 
            onViewStudent={handleViewStudent} 
          />
          {classData.students.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No students yet</h3>
              <p className="text-muted-foreground mb-6">Import your students to get started</p>
              <Button onClick={handleImportStudents}>
                <Upload className="mr-2 h-4 w-4" />
                Import Students
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassDetail;
