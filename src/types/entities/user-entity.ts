import { Features, Role } from "../models/user-types";

export type UserEntity = {
  login: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: Date;
  roles: Role[];
  features: Features;
};
