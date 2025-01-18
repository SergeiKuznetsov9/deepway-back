import { Features, Role } from "../common/user-common-types";

export type UserEntity = {
  login: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: Date;
  roles: Role[];
  features: Features;
};
