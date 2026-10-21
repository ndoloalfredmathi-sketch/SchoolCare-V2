import { Navigate, Route, Routes } from "react-router";
import { AppSidebar } from "@/components/layout/AppSidebar";
import AppHeader from "@/components/layout/AppHeader";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import StudentsPage from "@/pages/students/StudentsPage";
import ClassesPage from "@/pages/classes/ClassesPage";
import EnrollmentsPage from "@/pages/enrollments/EnrollmentsPage";
import SchoolYearsPage from "@/pages/school-years/SchoolYearsPage";


export default function AppSidebarLayout() {
  return (
    <AppSidebar>
      <AppHeader />

      <main className="flex-1 space-y-6 bg-muted/40 p-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/enrollments" element={<EnrollmentsPage />} />
          <Route path="/school-years" element={<SchoolYearsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </AppSidebar>
  );
}
