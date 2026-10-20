
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// Récupérer toutes les années scolaires
router.get("/", async (_req, res) => {
  try {
    const schoolYears = await prisma.schoolYear.findMany({
      orderBy: { startDate: "desc" },
    });

    res.json(schoolYears);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

// Créer une année scolaire
router.post("/", async (req, res) => {
  try {
    const { name, startDate, endDate, isCurrent } = req.body;

    if (!name || !startDate || !endDate) {
      res.status(400).json({
        message: "Le nom, la date de début et la date de fin sont obligatoires.",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      start >= end
    ) {
      res.status(400).json({
        message: "Les dates sont invalides ou la période est incorrecte.",
      });
      return;
    }

    const schoolYear = await prisma.schoolYear.create({
      data: {
        name,
        startDate: start,
        endDate: end,
        isCurrent: Boolean(isCurrent),
      },
    });

    res.status(201).json(schoolYear);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Impossible de créer l'année scolaire.",
    });
  }
});

export default router;
