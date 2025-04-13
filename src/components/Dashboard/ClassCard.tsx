
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClassCardProps {
  name: string;
  section: string;
  studentCount: number;
  assignments: number;
  pending: number;
  onClick: () => void;
}

export const ClassCard = ({ 
  name, 
  section, 
  studentCount, 
  assignments, 
  pending, 
  onClick 
}: ClassCardProps) => {
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Badge variant="outline">{section}</Badge>
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
              <span>{pending} Pending to grade</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
