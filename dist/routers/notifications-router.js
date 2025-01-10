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
const notifications_validators_1 = require("../middlewares/inputValidators/notifications-validators");
const common_validators_1 = require("../middlewares/inputValidators/common-validators");
const getNotificationsRouter = (notificationsService) => {
    const router = (0, express_1.Router)();
    router.get("/:userId", (0, notifications_validators_1.getNotificationGetParamsValidator)(), common_validators_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const notifications = yield notificationsService.getNotificationsByUserId(req.params.userId);
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
