import { ObjectId } from "mongodb";

const notifications = [
  {
    _id: new ObjectId("670e4b3d55e53c8e60a04821"),
    title: "Уведомление 1",
    description: "Произошло какое-то событие",
    userId: "670e4a9955e53c8e609cf174",
  },
  {
    _id: new ObjectId("670e4b3d55e53c8e60a04822"),
    title: "Уведомление 2",
    description: "Произошло какое-то событие",
    userId: "670e4a9955e53c8e609cf174",
    href: "http://localhost:3000/admin",
  },
  {
    _id: new ObjectId("670e4b3d55e53c8e60a04823"),
    title: "Уведомление 3",
    description: "Произошло какое-то событие",
    userId: "670e4a9955e53c8e609cf174",
    href: "http://localhost:3000/admin",
  },
  {
    _id: new ObjectId("670e4b3d55e53c8e60a04824"),
    title: "Уведомление 4",
    description: "Произошло какое-то событие",
    userId: "670e4a9955e53c8e609cf174",
  },
  {
    _id: new ObjectId("670e4b3d55e53c8e60a04825"),
    title: "Уведомление 1",
    description: "Произошло какое-то событие",
    userId: "670e4a9955e53c8e609cf175",
  },
];

export const getNotificationsMocks = () => notifications;
