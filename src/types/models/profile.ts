import { ObjectId } from "mongodb";

export type Profile = {
  _id: ObjectId;
  first: string;
  lastname: string;
  age: number;
  currency: string;
  country: string;
  city: string;
  username: string;
  avatar: string;
  userId: string;
};

export type ProfilePutParams = {
  userId: string;
};

export type ProfilePutBody = {
  age: number;
  avatar: string;
  city: string;
  country: string;
  currency: string;
  first: string;
  lastname: string;
  username: string;
};

export type ProfileGetParams = {
  userId: string;
};
