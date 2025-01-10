"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentPostBodyValidator = exports.getCommentGetQueryValidator = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("./utils");
const getCommentGetQueryValidator = () => [
    (0, express_validator_1.query)("_expand")
        .optional()
        .equals("user")
        .withMessage('The value of "_expand" must be user'),
    (0, express_validator_1.query)("articleId")
        .custom(utils_1.checkMongoDBValidity)
        .withMessage("Invalid article id"),
];
exports.getCommentGetQueryValidator = getCommentGetQueryValidator;
const getCommentPostBodyValidator = () => [
    (0, express_validator_1.body)("articleId")
        .custom(utils_1.checkMongoDBValidity)
        .withMessage("Invalid article id"),
    (0, express_validator_1.body)("userId").custom(utils_1.checkMongoDBValidity).withMessage("Invalid user id"),
    (0, express_validator_1.body)("text")
        .isString()
        .trim()
        .isLength({ min: 1, max: 512 })
        .withMessage("Invalid comment text"),
];
exports.getCommentPostBodyValidator = getCommentPostBodyValidator;
