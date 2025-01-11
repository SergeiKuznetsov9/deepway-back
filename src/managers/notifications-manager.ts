import { RequestWithParams } from "../types/primary-types";
import { NotificationsService } from "../services/notifications-service";
import { NotificationGetParams } from "../types/models/notification-types";

export class NotificationsManager {
  private service;

  constructor(service: NotificationsService) {
    this.service = service;
  }

  async handleGetNotificationsByUserId(
    req: RequestWithParams<NotificationGetParams>
  ) {
    return await this.service.getNotificationsByUserId(req.params.userId);
  }
}
