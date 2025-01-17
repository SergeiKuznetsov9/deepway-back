import { Features, Role } from "../models/user-types";

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
