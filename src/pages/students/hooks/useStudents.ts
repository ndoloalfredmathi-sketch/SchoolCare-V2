import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getStudents,
  type Student,
  type StudentStatus,
} from "@/services/studentService";

export type StudentStatusFilter = StudentStatus | "ALL";

function getLoadErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Impossible de charger les élèves.";
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StudentStatusFilter>("ALL");

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setStudents(await getStudents());
    } catch (err) {
      setError(getLoadErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    getStudents()
      .then((data) => {
        if (isMounted) {
          setStudents(data);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(getLoadErrorMessage(err));
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const addStudent = useCallback((student: Student) => {
    setStudents((previous) =>
      [...previous, student].sort(
        (a, b) =>
          a.lastName.localeCompare(b.lastName, "fr") ||
          a.firstName.localeCompare(b.firstName, "fr"),
      ),
    );
    setError(null);
  }, []);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");

    return students.filter((student) => {
      const matchesSearch = [
        student.matricule,
        student.lastName,
        student.firstName,
      ].some((value) => value.toLocaleLowerCase("fr").includes(query));

      const matchesStatus =
        statusFilter === "ALL" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, students]);

  return {
    addStudent,
    error,
    filteredStudents,
    hasActiveFilters: search.trim() !== "" || statusFilter !== "ALL",
    loading,
    reload,
    search,
    setSearch,
    setStatusFilter,
    statusFilter,
  };
}
