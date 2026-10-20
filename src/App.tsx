import { Navigate, Route, Routes } from "react-router";
import { AppSidebar } from "@/components/layout/AppSidebar";
import AppHeader from "./components/layout/AppHeader";
import DashboardPage from "./pages/DashboardPage";
import StudentsPage from "./pages/StudentsPage";

function ClassesPage() {
  return <h1 className="text-2xl font-bold">Classes</h1>;
}

function EnrollmentsPage() {
  return <h1 className="text-2xl font-bold">Inscriptions</h1>;
}

function SchoolYearsPage() {
  return <h1 className="text-2xl font-bold">Années scolaires</h1>;
}

export default function App() {
  return (
    <AppSidebarLayout />
  );
}

function AppSidebarLayout() {
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
