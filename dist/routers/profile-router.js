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
exports.getProfileRouter = void 0;
const express_1 = require("express");
const profile_validators_1 = require("../middlewares/inputValidators/profile-validators");
const common_validators_1 = require("../middlewares/inputValidators/common-validators");
const getProfileRouter = (profileService) => {
    const router = (0, express_1.Router)();
    router.get("/:userId", (0, profile_validators_1.getProfileGetParamsValidator)(), common_validators_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const profile = yield profileService.getProfileByUserId(req.params.userId);
            res.json(profile);
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    router.put("/:userId", (0, profile_validators_1.getProfilePutParamsValidator)(), (0, profile_validators_1.getProfilePutBodyValidator)(), common_validators_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateResult = yield profileService.updateProfileByUserId(req.params.userId, req.body);
            if (updateResult.matchedCount === 0) {
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
    return router;
};
exports.getProfileRouter = getProfileRouter;
