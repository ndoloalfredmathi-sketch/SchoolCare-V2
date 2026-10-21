import { useState } from "react";

import type { Student } from "@/services/studentService";
import StudentForm from "./StudentForm";
import { Skeleton } from "@/components/ui/skeleton";
import StudentsTable from "./components/StudentsTable";
import StudentsHeader from "./components/StudentsHeader";
import StudentsToolbar from "./components/StudentsToolbar";
import { useStudents } from "./hooks/useStudents";

export default function StudentsPage() {
  const {
    addStudent,
    error,
    filteredStudents,
    hasActiveFilters,
    loading,
    reload,
    search,
    setSearch,
    setStatusFilter,
    statusFilter,
  } = useStudents();
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function handleStudentCreated(student: Student) {
    addStudent(student);
    setShowForm(false);
    setSuccess(
      `${student.firstName} ${student.lastName} a été ajouté avec succès.`,
    );
  }

  return (
    <>
      <StudentsHeader />
      {success && (
        <div
          role="status"
          className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800"
        >
          {success}
        </div>
      )}
      <section className="h-fit rounded-lg border text-sm shadow-sm">
        <StudentsToolbar
          loading={loading}
          onAdd={() => {
            setSuccess(null);
            setShowForm((previous) => !previous);
          }}
          onRefresh={() => void reload()}
          onSearchChange={setSearch}
          onStatusFilterChange={setStatusFilter}
          search={search}
          statusFilter={statusFilter}
        />

        {showForm && (
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <StudentForm
              onSuccess={handleStudentCreated}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {loading ? (
          <>
            <p className="p-6 text-sm text-muted-foreground">
              Chargement des élèves...
            </p>
            <div className="flex flex-col space-y-2">
              <Skeleton className="w-full h-full" />
              <Skeleton className="w-full h-full" />
            </div>
          </>
        ) : error ? (
          <div className="space-y-3 p-6">
            <p role="alert" className="text-sm text-destructive">{error}</p>
            <button
              type="button"
              onClick={() => void reload()}
              className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <StudentsTable
            students={filteredStudents}
            hasActiveFilters={hasActiveFilters}
          />
        )}
      </section >
    </>
  );
}
