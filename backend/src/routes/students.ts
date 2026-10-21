import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { ApiError } from "../lib/ApiError.js";
import { createStudentSchema } from "../lib/studentValidation.js";
import { Prisma } from "@prisma/client";

const router = Router();

// Récupérer tous les élèves
router.get("/", async (_req, res) => {
  const students = await prisma.student.findMany({
    orderBy: [
      { lastName: "asc" },
      { firstName: "asc" },
    ],
  });

  res.json(students);
});

// Créer un élève
router.post("/", async (req, res) => {
  const parsed = createStudentSchema.safeParse(req.body);

  if (!parsed.success) {
    const issues = parsed.error.flatten();
    const firstMessage = Object.values(issues.fieldErrors).flat()[0] ?? "Données invalides.";

    res.status(400).json({
      message: firstMessage,
    });
    return;
  }

  const {
    matricule,
    firstName,
    lastName,
    gender,
    birthDate,
    birthPlace,
    address,
    phone,
    email,
  } = parsed.data;

  try {
    const student = await prisma.student.create({
      data: {
        matricule: matricule.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gender: gender ?? null,
        birthDate: birthDate && birthDate.trim() ? new Date(birthDate) : null,
        birthPlace: birthPlace?.trim() || null,
        address: address?.trim() || null,
        phone: phone?.trim() || null,
        email: email?.trim() || null,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new ApiError(409, "Ce matricule existe déjà.");
    }
    throw error;
  }
});

export default router;
