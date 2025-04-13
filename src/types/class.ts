
export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  roll: string;
}

export interface ClassData {
  id: string;
  name: string;
  section: string;
  studentCount: number;
  students: Student[];
  assignments: AssignmentSummary[];
}

export interface AssignmentSummary {
  id: string;
  title: string;
  subject: string;
  date: string;
  status: "draft" | "active" | "completed";
  completion: number;
  dueDate?: string;
  maxMarks?: number;
}

export interface AssignmentDetail extends AssignmentSummary {
  description?: string;
  rubric?: string;
  questionPaper?: string;
  markingScheme?: string;
  students: StudentAssignment[];
}

export interface StudentAssignment {
  studentId: string;
  studentName: string;
  status: "pending" | "processing" | "graded" | "failed";
  score?: number;
  submissionUrl?: string;
  feedbackUrl?: string;
  sharedUrl?: string;
  isShared: boolean;
}
