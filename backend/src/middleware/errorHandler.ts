import { Prisma } from "@prisma/client";
import type { ErrorRequestHandler } from "express";
import { ApiError } from "../lib/ApiError.js";

function hasErrorType(
  error: unknown,
  type: string,
): error is { type: string; status?: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    error.type === type
  );
}

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  let statusCode = 500;
  let message = "Une erreur interne est survenue.";

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      statusCode = 409;
      message = "Une ressource avec cette valeur existe déjà.";
    } else if (error.code === "P2025") {
      statusCode = 404;
      message = "Ressource introuvable.";
    } else if (error.code === "P2003") {
      statusCode = 409;
      message = "Cette opération entre en conflit avec des données existantes.";
    }
  } else if (hasErrorType(error, "entity.parse.failed")) {
    statusCode = 400;
    message = "Le corps de la requête contient un JSON invalide.";
  } else if (hasErrorType(error, "entity.too.large")) {
    statusCode = 413;
    message = "Le corps de la requête est trop volumineux.";
  }

  if (statusCode >= 500) {
    console.error("Erreur API non gérée :", error);
  }

  res.status(statusCode).json({ message });
};
