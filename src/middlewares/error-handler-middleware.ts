import { ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error";
import { Errors } from "../constants/errors-constants";

// next нужен даже если не используется так как в противном случае express
// не воспринимает эту функцию как обработчик ошибок
export const errorHandlerMiddleware: ErrorRequestHandler = (
  error,
  _,
  res,
  next
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  console.error("Необработанная ошибка:", error);
  res.status(500).json({ error: Errors.InternalServer });
};
