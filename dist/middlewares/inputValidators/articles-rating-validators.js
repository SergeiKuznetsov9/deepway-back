"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleRatingPostBodyValidator = exports.getArticleRatingGetQueryValidator = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("./utils");
const getArticleRatingGetQueryValidator = () => [
    (0, express_validator_1.query)("articleId")
        .custom(utils_1.checkMongoDBValidity)
        .withMessage("Invalid article id"),
    (0, express_validator_1.query)("userId").custom(utils_1.checkMongoDBValidity).withMessage("Invalid user id"),
];
exports.getArticleRatingGetQueryValidator = getArticleRatingGetQueryValidator;
const getArticleRatingPostBodyValidator = () => [
    (0, express_validator_1.body)("articleId")
        .custom(utils_1.checkMongoDBValidity)
        .withMessage("Invalid article id"),
    (0, express_validator_1.body)("userId").custom(utils_1.checkMongoDBValidity).withMessage("Invalid user id"),
    (0, express_validator_1.body)("rate").isInt({ min: 1, max: 5 }).withMessage("Invalid rate"),
    (0, express_validator_1.body)("feedback")
        .optional()
        .isString()
        .trim()
        .isLength({ min: 1, max: 512 })
        .withMessage("Invalid feedback"),
];
exports.getArticleRatingPostBodyValidator = getArticleRatingPostBodyValidator;
