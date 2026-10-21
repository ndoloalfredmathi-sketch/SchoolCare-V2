import { Router } from "express";
import { Prisma } from "@prisma/client";
import { ApiError } from "../lib/ApiError.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

// Récupérer les inscriptions
router.get("/", async (_req, res) => {
  const enrollments = await prisma.enrollment.findMany({
    include: {
      student: true,
      class: true,
      schoolYear: true,
    },
    orderBy: { enrolledAt: "desc" },
  });

  res.json(enrollments);
});

// Inscrire un élève dans une classe
router.post("/", async (req, res) => {
  const { studentId, classId, schoolYearId } = req.body ?? {};

  if (
    !Number.isInteger(studentId) ||
    !Number.isInteger(classId) ||
    !Number.isInteger(schoolYearId)
  ) {
    res.status(400).json({
      message: "studentId, classId et schoolYearId doivent être des entiers.",
    });
    return;
  }

  const [student, schoolClass, schoolYear] = await Promise.all([
    prisma.student.findUnique({ where: { id: studentId } }),
    prisma.class.findUnique({ where: { id: classId } }),
    prisma.schoolYear.findUnique({ where: { id: schoolYearId } }),
  ]);

  if (!student || !schoolClass || !schoolYear) {
    res.status(404).json({
      message: "Élève, classe ou année scolaire introuvable.",
    });
    return;
  }

  if (schoolClass.schoolYearId !== schoolYearId) {
    res.status(400).json({
      message: "La classe n'appartient pas à cette année scolaire.",
    });
    return;
  }

  try {
    const enrollment = await prisma.enrollment.create({
      data: { studentId, classId, schoolYearId },
      include: {
        student: true,
        class: true,
        schoolYear: true,
      },
    });

    res.status(201).json(enrollment);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new ApiError(409, "Cet élève est déjà inscrit pour cette année scolaire.");
    }
    throw error;
  }
});

export default router;
