
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CreateAssignment from "./pages/CreateAssignment";
import GradingPage from "./pages/GradingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import StudentView from "./pages/StudentView";
import NotFound from "./pages/NotFound";
import ClassDetail from "./pages/ClassDetail";
import AssignmentDetail from "./pages/AssignmentDetail";
import AssignmentSetup from "./pages/AssignmentSetup";
import AssignmentAnalytics from "./pages/AssignmentAnalytics";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="class/:classId" element={<ClassDetail />} />
                <Route path="assignment/:assignmentId" element={<AssignmentDetail />} />
                <Route path="assignment/setup/:assignmentId" element={<AssignmentSetup />} />
                <Route path="assignment/:assignmentId/analytics" element={<AssignmentAnalytics />} />
                <Route path="create-assignment" element={<CreateAssignment />} />
                <Route path="grading" element={<GradingPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
              </Route>
              <Route path="/student-view" element={<StudentView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
