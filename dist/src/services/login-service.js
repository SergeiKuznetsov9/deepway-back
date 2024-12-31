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
exports.LoginService = void 0;
class LoginService {
    constructor(client, dbName) {
        this.collection = client.db(dbName).collection("users");
    }
    getUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection.findOne(userData, {
                projection: { password: 0 },
            }));
        });
    }
}
exports.LoginService = LoginService;
