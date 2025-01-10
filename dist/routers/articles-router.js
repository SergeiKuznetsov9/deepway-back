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
exports.getArticleRouter = void 0;
const express_1 = require("express");
const articles_validators_1 = require("../middlewares/inputValidators/articles-validators");
const common_validators_1 = require("../middlewares/inputValidators/common-validators");
const getArticleRouter = (articlesService) => {
    const router = (0, express_1.Router)();
    router.get("/", (0, articles_validators_1.getArticlesGetQueryValidator)(), common_validators_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const articles = yield articlesService.getArticles(req.query);
            res.json(articles);
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    router.get("/:id", (0, articles_validators_1.getArticleGetParamsValidator)(), common_validators_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const article = yield articlesService.getArticleById(req.params.id);
            res.json(article);
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    return router;
};
exports.getArticleRouter = getArticleRouter;
