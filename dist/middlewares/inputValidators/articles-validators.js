"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleGetParamsValidator = exports.getArticlesGetQueryValidator = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("./utils");
const getArticlesGetQueryValidator = () => [
    (0, express_validator_1.query)("_expand")
        .optional()
        .equals("user")
        .withMessage('The value of "_expand" must be user'),
    (0, express_validator_1.query)("_sort")
        .optional()
        .matches(/^(created|title|views)$/)
        .withMessage('The value of "_sort" must be created or title or views'),
    (0, express_validator_1.query)("_order")
        .optional()
        .matches(/^(desc|asc)$/)
        .withMessage('The value of "_sort" must be desc or asc'),
    (0, express_validator_1.query)("_page")
        .optional()
        .matches(/^[1-9]\d*$/)
        .withMessage('The value of "_page" must be a number'),
    (0, express_validator_1.query)("_limit")
        .optional()
        .matches(/^[1-9]\d*$/)
        .withMessage('The value of "_limit" must be a number'),
    (0, express_validator_1.query)("type")
        .optional()
        .matches(/^(ALL|IT|ECONOMICS|SCIENCE)$/)
        .withMessage('The value of "type" must be ALL or IT or ECONOMICS or SCIENCE'),
    (0, express_validator_1.query)("q")
        .optional()
        .isLength({ min: 3 })
        .withMessage('The value of "q" is less than 3 chars'),
];
exports.getArticlesGetQueryValidator = getArticlesGetQueryValidator;
const getArticleGetParamsValidator = () => (0, express_validator_1.param)().custom(utils_1.checkMongoDBValidity).withMessage("Invalid article id");
exports.getArticleGetParamsValidator = getArticleGetParamsValidator;
