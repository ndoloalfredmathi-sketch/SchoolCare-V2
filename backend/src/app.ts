import express from "express";
import SchoolYearRouter  from "./routes/schoolYears.js";
import ClassesRouter from "./routes/classes.js";
import StudentsRouter from "./routes/students.js";
import EnrollmentsRouter from "./routes/enrollments.js";
import { prisma } from "./lib/prisma.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json({ limit: "100kb" }));
app.use("/api/school-years", SchoolYearRouter);
app.use("/api/classes", ClassesRouter);
app.use("/api/students", StudentsRouter);
app.use("/api/enrollments", EnrollmentsRouter);

app.get("/", (_req, res) => {
  res.json({
    message: "API de gestion scolaire opérationnelle",
  });
});

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);

    res.status(503).json({
      status: "error",
      database: "disconnected",
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({
    message: "Route introuvable.",
  });
});

app.use(errorHandler);

export default app;
