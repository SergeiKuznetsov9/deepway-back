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
exports.getArticleRatingsRouter = void 0;
const express_1 = require("express");
const getArticleRatingsRouter = (articleRatingsService) => {
    const router = (0, express_1.Router)();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const articleRating = yield articleRatingsService.getArticleRating(req.query);
            res.status(200).json(articleRating);
        }
        catch (error) {
            console.error("Ошибка получения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postResult = yield articleRatingsService.postArticleRating(req.body);
            res.status(201).json({ _id: postResult.insertedId.toString() });
        }
        catch (error) {
            console.error("Ошибка сохранения данных", error);
            res.status(500).json({ error: "Ошибка сохранения данных" });
        }
    }));
    return router;
};
exports.getArticleRatingsRouter = getArticleRatingsRouter;
