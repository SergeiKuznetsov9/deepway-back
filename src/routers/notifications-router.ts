import { Router, Response } from "express";

import { ErrorMessage } from "../types/messages-types";
import { RequestWithParams } from "../types/primary-types";
import { getNotificationGetParamsValidator } from "../middlewares/inputValidators/notifications-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";
import { NotificationsManager } from "../managers/notifications-manager";
import {
  NotificationGetInputDTO,
  NotificationGetOutputDTO,
} from "../types/dtos/notification-dto";

export const getNotificationsRouter = (manager: NotificationsManager) => {
  const router = Router();

  router.get(
    "/:userId",
    getNotificationGetParamsValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithParams<NotificationGetInputDTO>,
      res: Response<NotificationGetOutputDTO[] | ErrorMessage>
    ) => {
      try {
        const notifications = await manager.handleGetNotificationsByUserId(req);
        res.json(notifications);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  return router;
};
