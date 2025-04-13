
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, AlertCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ClassCardProps {
  id: string;
  name: string;
  section: string;
  studentCount: number;
  assignments: number;
  pending: number;
  onClick: () => void;
  onImportStudents: () => void;
}

export const ClassCard = ({ 
  id,
  name, 
  section, 
  studentCount, 
  assignments, 
  pending, 
  onClick,
  onImportStudents
}: ClassCardProps) => {
  return (
    <Card 
      className="hover:shadow-md transition-all duration-300 group border border-gray-200"
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">{section}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 mt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users size={16} />
            <span>{studentCount} Students</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText size={16} />
            <span>{assignments} Assignments</span>
          </div>
          {pending > 0 && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <AlertCircle size={16} />
              <span>{pending} Active assignment{pending !== 1 ? 's' : ''}</span>
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onImportStudents();
              }}
            >
              <Upload size={14} className="mr-1" />
              Import Students
            </Button>
            <Button 
              size="sm" 
              className="flex-1 text-xs"
              onClick={onClick}
            >
              View Class
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
