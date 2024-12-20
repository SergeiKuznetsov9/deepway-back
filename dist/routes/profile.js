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
exports.addProfileRoutes = void 0;
const addProfileRoutes = (app, client) => {
    app.get("/profile/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const profile = (yield client
                .db("deepway")
                .collection("profile")
                .findOne({ userId }));
            res.json(profile);
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    app.put("/profile/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { age, avatar, city, country, currency, first, lastname, username, } = req.body;
        try {
            const userId = req.params.userId;
            const result = yield client
                .db("deepway")
                .collection("profile")
                .updateOne({ userId }, {
                $set: {
                    first,
                    lastname,
                    age,
                    currency,
                    country,
                    city,
                    username,
                    avatar,
                },
            });
            if (result.matchedCount === 0) {
                res.status(404).json({ error: "Профиль не найден" });
                return;
            }
            res.status(200).json({ message: "Профиль обновлён" });
        }
        catch (error) {
            console.error("Ошибка обновления данных", error);
            res.status(500).json({ error: "Ошибка обновления данных" });
        }
    }));
};
exports.addProfileRoutes = addProfileRoutes;
