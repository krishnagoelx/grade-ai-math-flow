
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";
import { ClassCard } from "@/components/Dashboard/ClassCard";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ClassData } from "@/types/class";

const Dashboard = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const [classes, setClasses] = useState<ClassData[]>([
    { 
      id: "class-001",
      name: "Mathematics Grade 10", 
      section: "10A", 
      studentCount: 32, 
      students: [],
      assignments: [
        { 
          id: "assign-001",
          title: "Linear Equations Test", 
          subject: "Algebra", 
          date: "Apr 10, 2023", 
          status: "completed", 
          completion: 100 
        },
        { 
          id: "assign-002",
          title: "Probability Quiz", 
          subject: "Statistics", 
          date: "Apr 5, 2023", 
          status: "active", 
          completion: 68 
        }
      ]
    },
    { 
      id: "class-002",
      name: "Mathematics Grade 11", 
      section: "11B", 
      studentCount: 28, 
      students: [],
      assignments: [
        { 
          id: "assign-003",
          title: "Calculus Midterm", 
          subject: "Calculus", 
          date: "Apr 3, 2023", 
          status: "draft", 
          completion: 0 
        }
      ]
    }
  ]);
  
  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const className = formData.get('className') as string;
    const section = formData.get('section') as string;
    
    if (!className || !section) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would be an API call
    const newClass: ClassData = {
      id: `class-${Date.now()}`,
      name: className,
      section: section,
      studentCount: 0,
      students: [],
      assignments: []
    };
    
    setClasses([...classes, newClass]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Class created",
      description: `${className} (${section}) has been created successfully`
    });
  };
  
  const handleImportStudents = (classId: string) => {
    toast({
      title: "Import triggered",
      description: "Student import functionality would be triggered here"
    });
  };
  
  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes Dashboard</h1>
          <p className="text-muted-foreground">Manage your classes and assignments</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateClass} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="className">Class Name</Label>
                <Input id="className" name="className" placeholder="e.g., Mathematics Grade 10" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input id="section" name="section" placeholder="e.g., 10A" required />
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" type="button" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Class</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <ClassCard
            key={classItem.id}
            id={classItem.id}
            name={classItem.name}
            section={classItem.section}
            studentCount={classItem.studentCount}
            assignments={classItem.assignments.length}
            pending={classItem.assignments.filter(a => a.status === "active").length}
            onImportStudents={() => handleImportStudents(classItem.id)}
            onClick={() => handleClassClick(classItem.id)}
          />
        ))}
        
        <div className="border border-dashed rounded-lg flex flex-col items-center justify-center p-6 h-full min-h-[200px]">
          <h3 className="font-medium mb-2">Add a New Class</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">Create a new class to manage students and assignments</p>
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle size={16} className="mr-2" />
            Create Class
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
