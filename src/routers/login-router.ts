import { Router, Request, Response } from "express";

import { ErrorMessage } from "../types/models/messages";
import { User } from "../types/models/user";
import { LoginService } from "../services/login-service";

export const getLoginRouter = (loginService: LoginService) => {
  const router = Router();

  router.post("/", async (req: Request, res: Response<User | ErrorMessage>) => {
    try {
      const user = await loginService.getUser(req.body);

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
  });

  return router;
};
