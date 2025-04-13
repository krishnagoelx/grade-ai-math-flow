
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, BarChart } from "lucide-react";
import { ClassCard } from "@/components/Dashboard/ClassCard";
import { AssignmentCard } from "@/components/Dashboard/AssignmentCard";
import { StudentTable, Student } from "@/components/Dashboard/StudentTable";
import { UploadAttendanceSheet } from "@/components/Dashboard/UploadAttendanceSheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: "ST001", name: "John Doe", email: "john.doe@example.com", class: "10A", roll: "01" },
    { id: "ST002", name: "Jane Smith", email: "jane.smith@example.com", class: "10A", roll: "02" },
    { id: "ST003", name: "Robert Johnson", email: "robert.j@example.com", class: "10A", roll: "03" },
  ]);
  
  const { toast } = useToast();
  
  const handleUploadAttendance = (data: any) => {
    // Merge new students with existing ones (in a real app, this would be more sophisticated)
    setStudents(prev => {
      const existingIds = new Set(prev.map(s => s.id));
      const newStudents = data.students.filter((s: Student) => !existingIds.has(s.id));
      return [...prev, ...newStudents];
    });
  };
  
  const handleViewStudent = (id: string) => {
    toast({
      title: "View Student",
      description: `Viewing student with ID: ${id}`,
    });
  };
  
  const classes = [
    { name: "Mathematics Grade 10", section: "10A", studentCount: 32, assignments: 8, pending: 2 },
    { name: "Mathematics Grade 11", section: "11B", studentCount: 28, assignments: 5, pending: 0 },
    { name: "Calculus Advanced", section: "12C", studentCount: 24, assignments: 6, pending: 1 },
  ];
  
  const recentAssignments = [
    { 
      title: "Linear Equations Test", 
      subject: "Algebra", 
      date: "Apr 10, 2023", 
      status: "completed" as const, 
      completion: 100 
    },
    { 
      title: "Probability Quiz", 
      subject: "Statistics", 
      date: "Apr 5, 2023", 
      status: "in-progress" as const, 
      completion: 68 
    },
    { 
      title: "Geometry Midterm", 
      subject: "Geometry", 
      date: "Mar 28, 2023", 
      status: "pending" as const, 
      completion: 0 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your classes and assignments</p>
        </div>
        <div className="flex gap-2">
          <UploadAttendanceSheet onUploadComplete={handleUploadAttendance} />
          <Button asChild>
            <Link to="/create-assignment">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Assignment
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="classes">
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Recent Assignments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="classes" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem, index) => (
              <ClassCard
                key={index}
                name={classItem.name}
                section={classItem.section}
                studentCount={classItem.studentCount}
                assignments={classItem.assignments}
                pending={classItem.pending}
                onClick={() => {
                  toast({
                    title: "Class Selected",
                    description: `You clicked on ${classItem.name}`,
                  });
                }}
              />
            ))}
            
            <div className="border border-dashed rounded-lg flex flex-col items-center justify-center p-6 h-full min-h-[200px]">
              <h3 className="font-medium mb-2">Add a New Class</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">Create a new class to manage students and assignments</p>
              <Button variant="outline">
                <PlusCircle size={16} className="mr-2" />
                Create Class
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="py-4">
          <StudentTable 
            students={students} 
            onViewStudent={handleViewStudent} 
          />
        </TabsContent>
        
        <TabsContent value="assignments" className="py-4">
          <div className="flex justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Assignments</h2>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/assignments">
                  <BookOpen size={16} className="mr-2" />
                  All Assignments
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/analytics">
                  <BarChart size={16} className="mr-2" />
                  Analytics
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAssignments.map((assignment, index) => (
              <AssignmentCard
                key={index}
                title={assignment.title}
                subject={assignment.subject}
                date={assignment.date}
                status={assignment.status}
                completion={assignment.completion}
                onViewClick={() => {
                  toast({
                    title: "View Assignment",
                    description: `Viewing ${assignment.title}`,
                  });
                }}
                onGradeClick={assignment.status !== "completed" ? () => {
                  toast({
                    title: "Grade Assignment",
                    description: `Grading ${assignment.title}`,
                  });
                } : undefined}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
