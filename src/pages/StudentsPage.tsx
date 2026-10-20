import { useEffect, useState } from "react";
import { RefreshCw, Search, Filter, UserPlus, ChevronDown, MoreHorizontal, ChevronsUpDown } from "lucide-react";

import {
  getStudents,
  type Student,
} from "@/services/studentService";
import StudentForm from "./StudentForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const statusStyles = {
  ACTIF: "border-0 bg-emerald-50 text-emerald-600",
  INACTIF: "border-0 bg-sky-50 text-sky-600",
  BLOQUE: "border-0 bg-rose-50 text-rose-600",
}

const filters = [
  {
    key: "ALL",
    label: "Tous les status"
  },
  {
    key: "ACTIVE",
    label: "Active"
  },
  {
    key: "INACTIVE",
    label: "Inactive"
  },
  {
    key: "BLOQUE",
    label: "Bloqué"
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  async function loadStudents() {
    try {
      setLoading(true);
      setError(null);
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible de charger les élèves.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadStudents();
  }, []);

  function handleStudentCreated(student: Student) {
    setStudents((previous) =>
      [...previous, student].sort(
        (a, b) =>
          a.lastName.localeCompare(b.lastName, "fr") ||
          a.firstName.localeCompare(b.firstName, "fr"),
      ),
    );
    setShowForm(false);
    setSuccess(
      `${student.firstName} ${student.lastName} a été ajouté avec succès.`,
    );
    setError(null);
  }

  const filteredStudents = students.filter((student) => {
    const query = search.trim().toLocaleLowerCase("fr");

    const matchesSearch = [
      student.matricule,
      student.lastName,
      student.firstName,
    ].some((value) =>
      (value ?? "").toLocaleLowerCase("fr").includes(query),
    );

    const matchesStatus =
      statusFilter === "ALL" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatus = ((e: any) => {
    setStatusFilter(e)
  })

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Élèves</h1>
        <p className="text-sm text-muted-foreground">
          Gérez les élèves de votre établissement.
        </p>
      </div>
      {success && (
        <div
          role="status"
          className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800"
        >
          {success}
        </div>
      )}
      <section className="w-full rounded-lg border bg-white text-sm shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b p-3">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Recherche..."
                className="h-9 pl-8"
              />
            </div>
            <Select value={statusFilter} modal={true} onValueChange={(value) => handleStatus(value)}>
              <SelectTrigger>
                <Filter /> <SelectValue />
              </SelectTrigger>

              <SelectContent align="start">
                {filters.map((filter) => (
                  <SelectItem key={filter.key} value={filter.key}>{filter.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button
              onClick={() => {
                setSuccess(null);
                setShowForm((previous) => !previous);
              }}
              size={"sm"}
            >
              <UserPlus className="size-4" /> {"Ajouter un élève"}
            </Button>
            <Button
              variant={"outline"}
              onClick={() => void loadStudents()}
              disabled={loading}
              aria-label="Actualiser la liste"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

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
              <Skeleton className="w-full h-full"/>
              <Skeleton className="w-full h-full"/>
            </div>
          </>
        ) : error ? (
          <div className="space-y-3 p-6">
            <p role="alert" className="text-sm text-destructive">{error}</p>
            <button
              type="button"
              onClick={() => void loadStudents()}
              className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10">
                  <Checkbox aria-label="Tout sélectionner" />
                </TableHead>
                {["Matricule", "Nom", "Prénom", "Téléphone", "Statut"].map(
                  (heading) => (
                    <TableHead key={heading} className="whitespace-nowrap text-xs">
                      <button className="inline-flex items-center gap-1">
                        {heading}
                        {heading === "Nom" ? (
                          <ChevronDown className="size-3" />
                        ) : (
                          <ChevronsUpDown className="size-3 text-muted-foreground" />
                        )}
                      </button>
                    </TableHead>
                  )
                )}
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.matricule}>
                  <TableCell>
                    <Checkbox aria-label={`Sélectionner ${student.lastName}`} />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium leading-4">{student.matricule}</div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{student.lastName}</TableCell>
                  <TableCell className="whitespace-nowrap">{student.firstName}</TableCell>
                  <TableCell className="whitespace-nowrap">{student.phone}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[student.status as keyof typeof statusStyles]}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="size-8" aria-label="Actions">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    {search || statusFilter !== "ALL"
                      ? "Aucun élève ne correspond à votre recherche."
                      : "Aucun élève enregistré."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </section >
    </>
  );
}
