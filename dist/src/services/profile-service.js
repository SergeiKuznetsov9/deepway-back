"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const mongodb_1 = require("mongodb");
class ProfileService {
    constructor(client, dbName) {
        this.collection = client.db(dbName).collection("profile");
    }
    getProfileByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection.findOne({ userId }));
        });
    }
    updateProfileByUserId(_id, profilePutBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.collection.updateOne({ _id: new mongodb_1.ObjectId(_id) }, { $set: Object.assign({}, profilePutBody) });
        });
    }
}
exports.ProfileService = ProfileService;
