import { Router, Response } from "express";

import { ErrorMessage } from "../types/models/messages-types";
import { User, UserCredentials } from "../types/models/user-types";
import { LoginManager } from "../managers/login-manager";
import { RequestWithBody } from "../types/primary-types";

export const getLoginRouter = (manager: LoginManager) => {
  const router = Router();

  router.post(
    "/",
    async (
      req: RequestWithBody<UserCredentials>,
      res: Response<User | ErrorMessage>
    ) => {
      try {
        const user = await manager.handleGetUser(req);

        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            error: "Пользователь с таким именем и паролем не существует",
          });
        }
      } catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
      }
    }
  );

  return router;
};
