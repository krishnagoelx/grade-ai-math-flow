
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { FileText, Calendar, BarChart, AlertCircle, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface AssignmentCardProps {
  id: string;
  title: string;
  subject: string;
  date: string;
  status: "draft" | "active" | "completed";
  completion: number;
  maxMarks?: number;
}

export const AssignmentCard = ({
  id,
  title,
  subject,
  date,
  status,
  completion,
  maxMarks,
}: AssignmentCardProps) => {
  const navigate = useNavigate();
  
  const statusConfig = {
    "draft": { 
      label: "Draft", 
      color: "bg-gray-100 text-gray-800",
      icon: Clock
    },
    "active": { 
      label: "Active", 
      color: "bg-blue-100 text-blue-800",
      icon: AlertCircle 
    },
    "completed": { 
      label: "Completed", 
      color: "bg-green-100 text-green-800",
      icon: BarChart
    },
  };
  
  const StatusIcon = statusConfig[status].icon;
  
  const handleViewAssignment = () => {
    navigate(`/assignment/${id}`);
  };
  
  return (
    <Card className="hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline" className={statusConfig[status].color}>
            {statusConfig[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3 mt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText size={16} />
            <span>{subject}</span>
            {maxMarks && <span className="ml-auto font-medium">{maxMarks} marks</span>}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
          
          {status !== "draft" && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{completion}%</span>
              </div>
              <Progress value={completion} className="h-2" />
            </div>
          )}
          
          {status === "draft" && (
            <div className="flex items-center gap-2 text-sm text-amber-600 mt-2">
              <StatusIcon size={16} />
              <span>Setup required</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full" 
          variant={status === "draft" ? "default" : "outline"}
          onClick={handleViewAssignment}
        >
          <Eye size={16} className="mr-2" />
          {status === "draft" ? "Complete Setup" : "View Assignment"}
        </Button>
      </CardFooter>
    </Card>
  );
};
