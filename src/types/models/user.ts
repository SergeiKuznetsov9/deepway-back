import { ObjectId } from "mongodb";

type Role = "USER" | "MANAGER" | "ADMIN";
type Features = Record<string, boolean>;

export type User = {
  _id: ObjectId;
  username: string;
  roles: Role[];
  avatar: string;
  features: Features;
};
