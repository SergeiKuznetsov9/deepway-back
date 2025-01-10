import { ObjectId } from "mongodb";

export type Notification = {
  _id: ObjectId;
  title: string;
  userId: string;
  description: string;
  href: string;
};

export type NotificationGetParams = Pick<Notification, "userId">;
