
import { useState, type FormEvent } from "react";
import {
  createStudent,
  type CreateStudentInput,
  type Student,
} from "@/services/studentService";

interface StudentFormProps {
  onSuccess: (student: Student) => void;
  onCancel: () => void;
}

const initialForm: CreateStudentInput = {
  matricule: "",
  firstName: "",
  lastName: "",
  gender: "",
  birthDate: "",
  birthPlace: "",
  address: "",
  phone: "",
  email: "",
};

export default function StudentForm({
  onSuccess,
  onCancel,
}: StudentFormProps) {
  const [form, setForm] = useState<CreateStudentInput>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(
    field: keyof CreateStudentInput,
    value: string,
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload: CreateStudentInput = {
        matricule: form.matricule.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        gender: form.gender || undefined,
        birthDate: form.birthDate || undefined,
        birthPlace: form.birthPlace?.trim() || undefined,
        address: form.address?.trim() || undefined,
        phone: form.phone?.trim() || undefined,
        email: form.email?.trim() || undefined,
      };

      const student = await createStudent(payload);
      onSuccess(student);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'enregistrer cet élève.",
      );
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: "matricule", label: "Matricule", required: true },
    { name: "lastName", label: "Nom", required: true },
    { name: "firstName", label: "Prénom", required: true },
    { name: "birthPlace", label: "Lieu de naissance" },
    { name: "phone", label: "Téléphone", type: "tel" },
    { name: "email", label: "Adresse e-mail", type: "email" },
    { name: "address", label: "Adresse" },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">Ajouter un élève</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Les champs marqués d'un * sont obligatoires.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {"required" in field && field.required ? " *" : ""}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={"type" in field ? field.type : "text"}
              required={"required" in field && field.required}
              value={form[field.name] ?? ""}
              onChange={(event) =>
                updateField(field.name, event.target.value)
              }
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        ))}

        <div className="space-y-2">
          <label htmlFor="gender" className="text-sm font-medium">
            Sexe
          </label>
          <select
            id="gender"
            name="gender"
            value={form.gender ?? ""}
            onChange={(event) => updateField("gender", event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Non renseigné</option>
            <option value="M">Masculin</option>
            <option value="F">Féminin</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="birthDate" className="text-sm font-medium">
            Date de naissance
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={form.birthDate ?? ""}
            onChange={(event) => updateField("birthDate", event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Enregistrer l'élève"}
        </button>
      </div>
    </form>
  );
}
