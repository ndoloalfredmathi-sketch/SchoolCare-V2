export type StudentStatus = "ACTIVE" | "INACTIVE" | "BLOQUE";
export type StudentGender = "M" | "F";

export interface Student {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  gender?: StudentGender | null;
  birthDate?: string | null;
  birthPlace?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  photoUrl?: string | null;
  status: StudentStatus;
  createdAt: string;
  updatedAt: string;
}

export async function getStudents(): Promise<Student[]> {
  const response = await fetch("/api/students");

  if (!response.ok) {
    throw new Error(
      `Erreur lors du chargement des élèves (${response.status})`,
    );
  }

  return response.json() as Promise<Student[]>;
}

export interface CreateStudentInput {
  matricule: string;
  firstName: string;
  lastName: string;
  gender?: StudentGender;
  birthDate?: string;
  birthPlace?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export async function createStudent(
  student: CreateStudentInput,
): Promise<Student> {
  const response = await fetch("/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      message || `Erreur lors de la création (${response.status})`,
    );
  }

  return response.json() as Promise<Student>;
}
