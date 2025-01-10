import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valResult = validationResult(req);

  if (!valResult.isEmpty()) {
    const errorTextsArray = valResult.array().map((error) => error.msg);
    const errorsForResponse = errorTextsArray.join("; ");
    res.status(400).json({ error: errorsForResponse });
  } else {
    next();
  }
};
