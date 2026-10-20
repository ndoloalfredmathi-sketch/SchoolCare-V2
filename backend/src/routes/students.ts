import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// Récupérer tous les élèves
router.get("/", async (_req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: [
        { lastName: "asc" },
        { firstName: "asc" },
      ],
    });

    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des élèves.",
    });
  }
});

// Créer un élève
router.post("/", async (req, res) => {
  try {
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
    } = req.body;

    if (
      typeof matricule !== "string" || !matricule.trim() ||
      typeof firstName !== "string" || !firstName.trim() ||
      typeof lastName !== "string" || !lastName.trim()
    ) {
      res.status(400).json({
        message: "Le matricule, le prénom et le nom sont obligatoires.",
      });
      return;
    }

    if (
      birthDate !== undefined &&
      birthDate !== null &&
      (typeof birthDate !== "string" ||
        Number.isNaN(Date.parse(birthDate)))
    ) {
      res.status(400).json({
        message: "La date de naissance est invalide.",
      });
      return;
    }

    const student = await prisma.student.create({
      data: {
        matricule: matricule.trim(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        gender: gender ?? null,
        birthDate: birthDate ? new Date(birthDate) : null,
        birthPlace: birthPlace ?? null,
        address: address ?? null,
        phone: phone ?? null,
        email: email ?? null,
      },
    });

    res.status(201).json(student);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        message: "Ce matricule existe déjà.",
      });
      return;
    }

    console.error(error);
    res.status(500).json({
      message: "Impossible de créer l'élève.",
    });
  }
});

export default router;
