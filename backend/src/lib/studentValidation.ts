import { z } from "zod";

export const studentGenderSchema = z.enum(["M", "F"]);
export const studentStatusSchema = z.enum(["ACTIVE", "INACTIVE", "BLOQUE"]);

export const createStudentSchema = z.object({
  matricule: z.string().min(1, "Le matricule est obligatoire."),
  firstName: z.string().min(1, "Le prénom est obligatoire."),
  lastName: z.string().min(1, "Le nom est obligatoire."),
  gender: z
    .union([studentGenderSchema, z.literal(""), z.null(), z.undefined()])
    .optional(),
  birthDate: z
    .union([z.string(), z.null(), z.undefined()])
    .optional(),
  birthPlace: z
    .union([z.string(), z.null(), z.undefined()])
    .optional(),
  address: z
    .union([z.string(), z.null(), z.undefined()])
    .optional(),
  phone: z
    .union([z.string(), z.null(), z.undefined()])
    .optional(),
  email: z
    .union([z.string(), z.null(), z.undefined()])
    .optional(),
}).superRefine((student, ctx) => {
  if (
    typeof student.birthDate === "string" &&
    student.birthDate.trim() !== "" &&
    Number.isNaN(Date.parse(student.birthDate))
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["birthDate"],
      message: "La date de naissance est invalide.",
    });
  }

  if (
    typeof student.email === "string" &&
    student.email.trim() !== "" &&
    !z.string().email().safeParse(student.email).success
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["email"],
      message: "L'adresse e-mail est invalide.",
    });
  }

  if (
    typeof student.phone === "string" &&
    student.phone.trim() !== "" &&
    student.phone.trim().length < 8
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "Le numéro de téléphone est invalide.",
    });
  }
});
