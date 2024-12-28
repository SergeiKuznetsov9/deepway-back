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
exports.getLoginRouter = void 0;
const express_1 = require("express");
const getLoginRouter = (loginService) => {
    const router = (0, express_1.Router)();
    router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield loginService.getUser(req.body);
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
    return router;
};
exports.getLoginRouter = getLoginRouter;
