export type NotificationGetOutputDTO = {
  _id: string;
  title: string;
  userId: string;
  description: string;
  href: string;
};

export type NotificationGetInputDTO = {
  userId: string;
};
