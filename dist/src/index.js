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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const db_1 = require("./db/db");
const port = process.env.PORT || 3000;
const mongoDbName = process.env.MONGO_DB_NAME || "";
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, db_1.runDb)();
    const app = (0, app_1.createApp)(client, mongoDbName);
    app.listen(port, () => {
        console.log(`Deepway app is listening on port ${port}`);
    });
});
startApp();
