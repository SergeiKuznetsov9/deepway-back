import { ObjectId } from "mongodb";

export const checkMongoDBValidity = (value: string) => {
  if (!ObjectId.isValid(value)) {
    return false;
  }

  return true;
};
