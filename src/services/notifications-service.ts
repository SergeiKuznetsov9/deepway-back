import { MongoClient } from "mongodb";
import { Notification } from "../types/models/notification-types";

export class NotificationsService {
  private collection;

  constructor(client: MongoClient, dbName: string) {
    this.collection = client.db(dbName).collection("notifications");
  }

  async getNotificationsByUserId(userId: string) {
    return (await this.collection.find({ userId }).toArray()) as Notification[];
  }
}
