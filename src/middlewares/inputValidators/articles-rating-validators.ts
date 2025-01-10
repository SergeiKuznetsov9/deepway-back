import { query, body } from "express-validator";
import { checkMongoDBValidity } from "./utils";

export const getArticleRatingGetQueryValidator = () => [
  query("articleId")
    .custom(checkMongoDBValidity)
    .withMessage("Invalid article id"),
  query("userId").custom(checkMongoDBValidity).withMessage("Invalid user id"),
];

export const getArticleRatingPostBodyValidator = () => [
  body("articleId")
    .custom(checkMongoDBValidity)
    .withMessage("Invalid article id"),
  body("userId").custom(checkMongoDBValidity).withMessage("Invalid user id"),
  body("rate").isInt({ min: 1, max: 5 }).withMessage("Invalid rate"),
  body("feedback")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 512 })
    .withMessage("Invalid feedback"),
];
