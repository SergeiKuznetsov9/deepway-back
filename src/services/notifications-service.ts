import { Db } from "mongodb";
import { NotificationEntity } from "../types/entities/notification-entity";

export class NotificationsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<NotificationEntity>("notifications");
  }

  async getNotificationsByUserId(userId: string) {
    return await this.collection.find({ userId }).toArray();
  }
}
