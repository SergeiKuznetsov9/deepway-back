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
exports.getLoginRoutes = void 0;
const express_1 = __importDefault(require("express"));
const getLoginRoutes = (client) => {
    const loginRouter = express_1.default.Router();
    loginRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            const user = (yield client
                .db("deepway")
                .collection("users")
                .findOne({ username, password }, { projection: { password: 0 } }));
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({
                    error: "Пользователь с таким именем и паролем не существует",
                });
            }
        }
        catch (error) {
            console.error("Ошибка сохранения данных", error);
            res.status(500).json({ error: "Ошибка сохранения данных" });
        }
    }));
    return loginRouter;
};
exports.getLoginRoutes = getLoginRoutes;
