import { NextFunction, Request, Response } from "express";
import { AuthError } from "../errors/auth-error";
import { JwtService } from "../services/jwt-service";

const protectedRoutes = ["/articles"];

export const getAuthMiddleware =
  (jwtService: JwtService) =>
  (req: Request, _: Response, next: NextFunction) => {
    const { originalUrl } = req;

    if (!protectedRoutes.includes(originalUrl)) {
      next();
      return;
    }
    const { authorization } = req.headers;

    if (!authorization) {
      next(new AuthError());
      return;
    }

    const token = authorization.split(" ")[1];
    try {
      const invalToken = token + "d";

      const verifyResult = jwtService.verifyJWT(invalToken);
      req.requestContext = {
        ...req.requestContext,
        userId: verifyResult.userId,
      };
      next();
      return;
    } catch (error) {
      next(error);
      return;
    }
  };
