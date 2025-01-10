import { query, param } from "express-validator";
import { checkMongoDBValidity } from "./utils";

export const getArticlesGetQueryValidator = () => [
  query("_expand")
    .optional()
    .equals("user")
    .withMessage('The value of "_expand" must be user'),
  query("_sort")
    .optional()
    .matches(/^(created|title|views)$/)
    .withMessage('The value of "_sort" must be created or title or views'),
  query("_order")
    .optional()
    .matches(/^(desc|asc)$/)
    .withMessage('The value of "_sort" must be desc or asc'),
  query("_page")
    .optional()
    .matches(/^[1-9]\d*$/)
    .withMessage('The value of "_page" must be a number'),
  query("_limit")
    .optional()
    .matches(/^[1-9]\d*$/)
    .withMessage('The value of "_limit" must be a number'),
  query("type")
    .optional()
    .matches(/^(ALL|IT|ECONOMICS|SCIENCE)$/)
    .withMessage(
      'The value of "type" must be ALL or IT or ECONOMICS or SCIENCE'
    ),
  query("q")
    .optional()
    .isLength({ min: 3 })
    .withMessage('The value of "q" is less than 3 chars'),
];

export const getArticleGetParamsValidator = () =>
  param().custom(checkMongoDBValidity).withMessage("Invalid article id");
