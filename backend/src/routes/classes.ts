
import { Router } from "express";
import { Prisma } from "@prisma/client";
import { ApiError } from "../lib/ApiError.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

// Récupérer toutes les classes
router.get("/", async (_req, res) => {
  const classes = await prisma.class.findMany({
    include: { schoolYear: true },
    orderBy: { name: "asc" },
  });

  res.json(classes);
});

// Créer une classe
router.post("/", async (req, res) => {
  const { name, level, capacity, schoolYearId } = req.body ?? {};

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

  try {
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
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new ApiError(409, "Cette classe existe déjà pour cette année scolaire.");
    }
    throw error;
  }
});

export default router;
