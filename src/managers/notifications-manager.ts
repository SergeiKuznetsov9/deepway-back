import { RequestWithParams } from "../types/primary-types";
import { NotificationsService } from "../services/notifications-service";
import {
  NotificationGetInputDTO,
  NotificationGetOutputDTO,
} from "../types/dtos/notification-dto";

export class NotificationsManager {
  private service;

  constructor(service: NotificationsService) {
    this.service = service;
  }

  async handleGetNotificationsByUserId(
    req: RequestWithParams<NotificationGetInputDTO>
  ) {
    const notifications = await this.service.getNotificationsByUserId(
      req.params.userId
    );

    const notificationsAdapted: NotificationGetOutputDTO[] = notifications.map(
      (notification) => ({
        _id: notification._id.toString(),
        title: notification.title,
        userId: notification.userId,
        description: notification.description,
        href: notification.href,
      })
    );

    return notificationsAdapted;
  }
}
