import { param, body } from "express-validator";
import { checkMongoDBValidity } from "./utils";

export const getProfileGetParamsValidator = () =>
  param("userId").custom(checkMongoDBValidity).withMessage("Invalid user id");

export const getProfilePutParamsValidator = () =>
  param("userId").custom(checkMongoDBValidity).withMessage("Invalid user id");

export const getProfilePutBodyValidator = () => [
  body("age").isInt({ min: 14, max: 110 }).withMessage("Invalid age"),
  body("avatar")
    .isString()
    .matches(/^(https?):\/\/[^\s$.?#].[^\s]*$/)
    .withMessage("Invalid avatar"),
  body("city")
    .isString()
    .trim()
    .isLength({ min: 1, max: 32 })
    .withMessage("Invalid city"),
  body("country")
    .isString()
    .trim()
    .isLength({ min: 1, max: 32 })
    .withMessage("Invalid country"),
  body("currency")
    .isString()
    .trim()
    .isLength({ min: 1, max: 3 })
    .withMessage("Invalid currency"),
  body("first")
    .isString()
    .trim()
    .isLength({ min: 1, max: 32 })
    .withMessage("Invalid first"),
  body("lastname")
    .isString()
    .trim()
    .isLength({ min: 1, max: 32 })
    .withMessage("Invalid lastname"),
  body("username")
    .isString()
    .trim()
    .isLength({ min: 1, max: 32 })
    .withMessage("Invalid username"),
];
