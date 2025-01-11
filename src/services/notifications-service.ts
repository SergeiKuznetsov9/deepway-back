import { Db } from "mongodb";
import { Notification } from "../types/models/notification-types";

export class NotificationsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<Notification>("notifications");
  }

  async getNotificationsByUserId(userId: string) {
    return await this.collection.find({ userId }).toArray();
  }
}
