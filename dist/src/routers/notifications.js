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
exports.getNotificationsRouter = void 0;
const express_1 = require("express");
const getNotificationsRouter = (client, mongoDbName) => {
    const router = (0, express_1.Router)();
    router.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const notifications = (yield client
                .db(mongoDbName)
                .collection("notifications")
                .find({ userId })
                .toArray());
            res.json(notifications);
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    return router;
};
exports.getNotificationsRouter = getNotificationsRouter;