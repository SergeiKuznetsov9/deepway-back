import { Features, Role } from "../common/user-common-types";

export type UserPostInputDTO = {
  login: string;
  password: string;
};

export type UserLoginInputDTO = {
  login: string;
  password: string;
};

export type UserLoginOutputDTO = {
  _id: string;
  login: string;
  createdAt: Date;
  roles: Role[];
  features: Features;
  token: string;
};
