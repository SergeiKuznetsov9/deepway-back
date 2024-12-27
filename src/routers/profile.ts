import { Router, Response } from "express";
import { MongoClient } from "mongodb";

import { ErrorMessage, SuccessMessage } from "../types/models/messages";
import { RequestWithParams, RequestWithParamsAndBody } from "../types/types";
import {
  Profile,
  ProfileGetParams,
  ProfilePutBody,
  ProfilePutParams,
} from "../types/models/profile";

export const getProfileRouter = (client: MongoClient, mongoDbName: string) => {
  const router = Router();

  router.get(
    "/:userId",
    async (
      req: RequestWithParams<ProfileGetParams>,
      res: Response<Profile | ErrorMessage>
    ) => {
      const userId = req.params.userId;

      try {
        const profile = (await client
          .db(mongoDbName)
          .collection("profile")
          .findOne({ userId })) as Profile;
        res.json(profile);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  router.put(
    "/:userId",
    async (
      req: RequestWithParamsAndBody<ProfilePutParams, ProfilePutBody>,
      res: Response<ErrorMessage | SuccessMessage>
    ): Promise<void> => {
      const {
        age,
        avatar,
        city,
        country,
        currency,
        first,
        lastname,
        username,
      } = req.body;

      try {
        const userId = req.params.userId;

        const result = await client
          .db(mongoDbName)
          .collection("profile")
          .updateOne(
            { userId },
            {
              $set: {
                first,
                lastname,
                age,
                currency,
                country,
                city,
                username,
                avatar,
              },
            }
          );
        if (result.matchedCount === 0) {
          res.status(404).json({ error: "Профиль не найден" });
          return;
        }

        res.status(200).json({ message: "Профиль обновлён" });
      } catch (error) {
        console.error("Ошибка обновления данных", error);
        res.status(500).json({ error: "Ошибка обновления данных" });
      }
    }
  );

  return router;
};
