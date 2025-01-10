"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMongoDBValidity = void 0;
const mongodb_1 = require("mongodb");
const checkMongoDBValidity = (value) => {
    if (!mongodb_1.ObjectId.isValid(value)) {
        return false;
    }
    return true;
};
exports.checkMongoDBValidity = checkMongoDBValidity;
