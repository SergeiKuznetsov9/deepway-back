"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const valResult = (0, express_validator_1.validationResult)(req);
    if (!valResult.isEmpty()) {
        const errorTextsArray = valResult.array().map((error) => error.msg);
        const errorsForResponse = errorTextsArray.join("; ");
        res.status(400).json({ error: errorsForResponse });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
