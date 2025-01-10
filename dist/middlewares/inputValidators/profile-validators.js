"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfilePutBodyValidator = exports.getProfilePutParamsValidator = exports.getProfileGetParamsValidator = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("./utils");
const getProfileGetParamsValidator = () => (0, express_validator_1.param)("userId").custom(utils_1.checkMongoDBValidity).withMessage("Invalid user id");
exports.getProfileGetParamsValidator = getProfileGetParamsValidator;
const getProfilePutParamsValidator = () => (0, express_validator_1.param)("userId").custom(utils_1.checkMongoDBValidity).withMessage("Invalid user id");
exports.getProfilePutParamsValidator = getProfilePutParamsValidator;
const getProfilePutBodyValidator = () => [
    (0, express_validator_1.body)("age").isInt({ min: 14, max: 110 }).withMessage("Invalid age"),
    (0, express_validator_1.body)("avatar")
        .isString()
        .matches(/^(https?):\/\/[^\s$.?#].[^\s]*$/)
        .withMessage("Invalid avatar"),
    (0, express_validator_1.body)("city")
        .isString()
        .trim()
        .isLength({ min: 1, max: 32 })
        .withMessage("Invalid city"),
    (0, express_validator_1.body)("country")
        .isString()
        .trim()
        .isLength({ min: 1, max: 32 })
        .withMessage("Invalid country"),
    (0, express_validator_1.body)("currency")
        .isString()
        .trim()
        .isLength({ min: 1, max: 3 })
        .withMessage("Invalid currency"),
    (0, express_validator_1.body)("first")
        .isString()
        .trim()
        .isLength({ min: 1, max: 32 })
        .withMessage("Invalid first"),
    (0, express_validator_1.body)("lastname")
        .isString()
        .trim()
        .isLength({ min: 1, max: 32 })
        .withMessage("Invalid lastname"),
    (0, express_validator_1.body)("username")
        .isString()
        .trim()
        .isLength({ min: 1, max: 32 })
        .withMessage("Invalid username"),
];
exports.getProfilePutBodyValidator = getProfilePutBodyValidator;
