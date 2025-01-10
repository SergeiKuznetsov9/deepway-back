export type Notification = {
  title: string;
  userId: string;
  description: string;
  href: string;
};

export type NotificationGetParams = Pick<Notification, "userId">;
