import { Router, Response, NextFunction } from "express";

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
      res: Response<NotificationGetOutputDTO[]>,
      next: NextFunction
    ) => {
      try {
        const notifications = await manager.handleGetNotificationsByUserId(req);
        res.json(notifications);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
