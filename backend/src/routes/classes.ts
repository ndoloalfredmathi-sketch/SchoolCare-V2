
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// Récupérer toutes les classes
router.get("/", async (_req, res) => {
  try {
    const classes = await prisma.class.findMany({
      include: { schoolYear: true },
      orderBy: { name: "asc" },
    });

    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des classes.",
    });
  }
});

// Créer une classe
router.post("/", async (req, res) => {
  try {
    const { name, level, capacity, schoolYearId } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof level !== "string" || !level.trim() ||
      !Number.isInteger(schoolYearId)
    ) {
      res.status(400).json({
        message: "Le nom, le niveau et l'identifiant de l'année scolaire sont obligatoires.",
      });
      return;
    }

    if (
      capacity !== undefined &&
      capacity !== null &&
      (!Number.isInteger(capacity) || capacity < 1)
    ) {
      res.status(400).json({
        message: "La capacité doit être un entier positif.",
      });
      return;
    }

    const schoolYear = await prisma.schoolYear.findUnique({
      where: { id: schoolYearId },
    });

    if (!schoolYear) {
      res.status(404).json({
        message: "Année scolaire introuvable.",
      });
      return;
    }

    const schoolClass = await prisma.class.create({
      data: {
        name: name.trim(),
        level: level.trim(),
        capacity: capacity ?? null,
        schoolYearId,
      },
      include: { schoolYear: true },
    });

    res.status(201).json(schoolClass);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        message: "Cette classe existe déjà pour cette année scolaire.",
      });
      return;
    }

    console.error(error);
    res.status(500).json({
      message: "Impossible de créer la classe.",
    });
  }
});

export default router;
