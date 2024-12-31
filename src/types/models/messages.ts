import { ObjectId } from "mongodb";

export type ErrorMessage = {
  error: string;
};

export type SuccessMessage = {
  message: string;
};

export type MessageWithEntityId = {
  _id: string;
};
