import { query, body } from "express-validator";
import { checkMongoDBValidity } from "./utils";

export const getCommentGetQueryValidator = () => [
  query("_expand")
    .optional()
    .equals("user")
    .withMessage('The value of "_expand" must be user'),
  query("articleId")
    .custom(checkMongoDBValidity)
    .withMessage("Invalid article id"),
];

export const getCommentPostBodyValidator = () => [
  body("articleId")
    .custom(checkMongoDBValidity)
    .withMessage("Invalid article id"),
  body("userId").custom(checkMongoDBValidity).withMessage("Invalid user id"),
  body("text")
    .isString()
    .trim()
    .isLength({ min: 1, max: 512 })
    .withMessage("Invalid comment text"),
];
