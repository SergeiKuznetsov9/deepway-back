import { Router, Response, NextFunction } from "express";

import { User, UserCredentials } from "../types/models/user-types";
import { LoginManager } from "../managers/login-manager";
import { RequestWithBody } from "../types/primary-types";
import { LoginError } from "../errors/login-error";

export const getLoginRouter = (manager: LoginManager) => {
  const router = Router();

  router.post(
    "/",
    async (
      req: RequestWithBody<UserCredentials>,
      res: Response<User>,
      next: NextFunction
    ) => {
      try {
        const user = await manager.handleGetUser(req);

        if (user) {
          res.status(200).json(user);
        } else {
          next(new LoginError());
        }
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
