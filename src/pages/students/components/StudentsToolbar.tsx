import { Filter, RefreshCw, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StudentStatusFilter } from "../hooks/useStudents";

const filters: Array<{ key: StudentStatusFilter; label: string }> = [
  { key: "ALL", label: "Tous les statuts" },
  { key: "ACTIVE", label: "Actif" },
  { key: "INACTIVE", label: "Inactif" },
  { key: "BLOQUE", label: "Bloqué" },
];

function isStudentStatusFilter(value: string): value is StudentStatusFilter {
  return filters.some((filter) => filter.key === value);
}

interface StudentsToolbarProps {
  loading: boolean;
  onAdd: () => void;
  onRefresh: () => void;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: StudentStatusFilter) => void;
  search: string;
  statusFilter: StudentStatusFilter;
}

export default function StudentsToolbar({
  loading,
  onAdd,
  onRefresh,
  onSearchChange,
  onStatusFilterChange,
  search,
  statusFilter,
}: StudentsToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b p-3">
      <div className="flex items-center gap-2">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Recherche..."
            className="h-9 pl-8"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            if (value && isStudentStatusFilter(value)) {
              onStatusFilterChange(value);
            }
          }}
        >
          <SelectTrigger>
            <Filter /> <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            {filters.map((filter) => (
              <SelectItem key={filter.key} value={filter.key}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button onClick={onAdd} size="sm">
          <UserPlus className="size-4" /> Ajouter un élève
        </Button>
        <Button
          variant="outline"
          onClick={onRefresh}
          disabled={loading}
          aria-label="Actualiser la liste"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </div>
  );
}
