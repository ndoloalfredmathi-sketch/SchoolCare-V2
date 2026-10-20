import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// Récupérer les inscriptions
router.get("/", async (_req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        student: true,
        class: true,
        schoolYear: true,
      },
      orderBy: { enrolledAt: "desc" },
    });

    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des inscriptions.",
    });
  }
});

// Inscrire un élève dans une classe
router.post("/", async (req, res) => {
  try {
    const { studentId, classId, schoolYearId } = req.body;

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
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        message: "Cet élève est déjà inscrit pour cette année scolaire.",
      });
      return;
    }

    console.error(error);
    res.status(500).json({
      message: "Impossible de créer l'inscription.",
    });
  }
});

export default router;
