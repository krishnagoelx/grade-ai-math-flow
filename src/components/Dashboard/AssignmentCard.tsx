
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, BarChart, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AssignmentCardProps {
  title: string;
  subject: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
  completion: number;
  onViewClick: () => void;
  onGradeClick?: () => void;
}

export const AssignmentCard = ({
  title,
  subject,
  date,
  status,
  completion,
  onViewClick,
  onGradeClick,
}: AssignmentCardProps) => {
  const statusMap = {
    "completed": { label: "Completed", color: "bg-green-100 text-green-800" },
    "in-progress": { label: "In Progress", color: "bg-blue-100 text-blue-800" },
    "pending": { label: "Pending", color: "bg-amber-100 text-amber-800" },
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <Badge variant="outline" className={statusMap[status].color}>
            {statusMap[status].label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3 mt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText size={16} />
            <span>{subject}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
          
          {status !== "pending" && (
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${completion}%` }}
              ></div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">{completion}% Graded</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <BarChart size={12} />
                  Analytics Available
                </span>
              </div>
            </div>
          )}
          
          {status === "pending" && (
            <div className="flex items-center gap-2 text-sm text-amber-600 mb-2">
              <AlertCircle size={16} />
              <span>Pending grading</span>
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={onViewClick} className="flex-1">
              View Details
            </Button>
            {(status === "pending" || status === "in-progress") && onGradeClick && (
              <Button size="sm" onClick={onGradeClick} className="flex-1">
                {status === "pending" ? "Start Grading" : "Continue Grading"}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
