import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";

import { ErrorMessage } from "../types/models/messages";
import { User } from "../types/models/user";

export const getLoginRoutes = (client: MongoClient) => {
  const loginRouter = express.Router();

  loginRouter.post(
    "/",
    async (req: Request, res: Response<User | ErrorMessage>) => {
      const { username, password } = req.body;

      try {
        const user = (await client
          .db("deepway")
          .collection("users")
          .findOne(
            { username, password },
            { projection: { password: 0 } }
          )) as User | null;

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

  return loginRouter;
};
