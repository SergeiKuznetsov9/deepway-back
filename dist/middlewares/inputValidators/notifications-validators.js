"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationGetParamsValidator = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("./utils");
const getNotificationGetParamsValidator = () => (0, express_validator_1.param)("userId").custom(utils_1.checkMongoDBValidity).withMessage("Invalid user id");
exports.getNotificationGetParamsValidator = getNotificationGetParamsValidator;
