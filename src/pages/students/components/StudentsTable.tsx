import {
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
} from "lucide-react";
import type { Student } from "@/services/studentService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const statusStyles: Record<Student["status"], string> = {
  ACTIVE: "border-0 bg-emerald-100 text-emerald-600",
  INACTIVE: "border-0 bg-sky-100 text-sky-600",
  BLOQUE: "border-0 bg-rose-100 text-rose-600",
};

type Props = {
  students: Student[];
  hasActiveFilters: boolean;
};

type CheckedState = boolean;

export default function StudentsTable({
  students,
  hasActiveFilters,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const selectedVisibleCount = students.filter((student) =>
    selected.includes(student.matricule),
  ).length;

  const checked: CheckedState =
    students.length > 0 && selectedVisibleCount === students.length
      ? true
      : selectedVisibleCount > 0
        ? false
        : false;

  const handleSelectAll = (value: CheckedState) => {
    if (value === true) {
      setSelected((previous) => [
        ...new Set([
          ...previous,
          ...students.map((student) => student.matricule),
        ]),
      ]);
    } else {
      // Désélectionne les lignes affichées sans toucher aux autres sélections.
      const visibleIds = new Set(students.map((student) => student.matricule));
      setSelected((previous) =>
        previous.filter((matricule) => !visibleIds.has(matricule)),
      );
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-10">
            <Checkbox
              aria-label="Tout sélectionner"
              checked={checked}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>

          {["Matricule", "Nom", "Prénom", "Téléphone", "Statut"].map(
            (heading) => (
              <TableHead key={heading} className="whitespace-nowrap text-xs">
                <button type="button" className="inline-flex items-center gap-1">
                  {heading}
                  {heading === "Nom" ? (
                    <ChevronDown className="size-3" />
                  ) : (
                    <ChevronsUpDown className="size-3 text-muted-foreground" />
                  )}
                </button>
              </TableHead>
            ),
          )}

          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {students.map((student) => (
          <TableRow key={student.matricule}>
            <TableCell>
              <Checkbox
                aria-label={`Sélectionner ${student.firstName} ${student.lastName}`}
                checked={selected.includes(student.matricule)}
                onCheckedChange={(value) => {
                  setSelected((previous) =>
                    value === true
                      ? [...new Set([...previous, student.matricule])]
                      : previous.filter(
                          (matricule) => matricule !== student.matricule,
                        ),
                  );
                }}
              />
            </TableCell>
            <TableCell className="font-medium">{student.matricule}</TableCell>
            <TableCell>{student.lastName}</TableCell>
            <TableCell>{student.firstName}</TableCell>
            <TableCell>{student.phone}</TableCell>
            <TableCell>
              <Badge className={statusStyles[student.status]}>
                {student.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                aria-label={`Actions pour ${student.firstName} ${student.lastName}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}

        {students.length === 0 && (
          <TableRow>
            <TableCell colSpan={7}>
              {hasActiveFilters
                ? "Aucun élève ne correspond à votre recherche."
                : "Aucun élève enregistré."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
