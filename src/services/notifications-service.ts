import { Db } from "mongodb";
import { NotificationEntity } from "../types/entities/notification-entity";
import { Errors } from "../constants/errors-constants";
import { DatabaseError } from "../errors/database-error";

export class NotificationsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<NotificationEntity>("notifications");
  }

  async getNotificationsByUserId(userId: string) {
    try {
      return await this.collection.find({ userId }).toArray();
    } catch (error) {
      console.error(Errors.DBGet, error);
      throw new DatabaseError(Errors.DBGet);
    }
  }
}
