import express, { Response } from "express";
import { MongoClient } from "mongodb";

import { ErrorMessage } from "../types/models/messages";
import { RequestWithParams } from "../types/types";
import {
  Notification,
  NotificationGetParams,
} from "../types/models/notification";

export const getNotificationsRoutes = (client: MongoClient) => {
  const notificationsRoutes = express.Router();

  notificationsRoutes.get(
    "/:userId",
    async (
      req: RequestWithParams<NotificationGetParams>,
      res: Response<Notification[] | ErrorMessage>
    ) => {
      const { userId } = req.params;

      try {
        const notifications = (await client
          .db("deepway")
          .collection("notifications")
          .find({ userId })
          .toArray()) as Notification[];

        res.json(notifications);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  return notificationsRoutes;
};
