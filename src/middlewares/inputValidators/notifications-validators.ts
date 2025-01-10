import { param } from "express-validator";
import { checkMongoDBValidity } from "./utils";

export const getNotificationGetParamsValidator = () =>
  param("userId").custom(checkMongoDBValidity).withMessage("Invalid user id");
