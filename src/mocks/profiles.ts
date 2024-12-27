import { ObjectId } from "mongodb";

const profiles = [
  {
    _id: new ObjectId("670e4b2c55e53c8e609fe55a"),
    first: "Сергей",
    lastname: "Кузнецофф",
    age: 37,
    currency: "RUB",
    country: "Belarus",
    city: "Moscow",
    username: "admin",
    avatar: "https://rp-wow.ru/upload/056/u5682/59/80/20811.jpg",
    userId: "670e4a9955e53c8e609cf174",
  },
  {
    _id: new ObjectId("670e4b2c55e53c8e609fe55b"),
    first: "Полиграф",
    lastname: "Шариков",
    age: "45",
    currency: "RUB",
    country: "Belarus",
    city: "Moscow",
    username: "user",
    avatar:
      "https://avatars.dzeninfra.ru/get-zen_doc/4467222/pub_62439a0d9f5e0b1fbda46cdc_62463860b752554f8054c8c8/scale_1200",
    userId: "670e4a9955e53c8e609cf176",
  },
];

export const getProfilesMocks = () => profiles;
