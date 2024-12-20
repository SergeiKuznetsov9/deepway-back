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
exports.addArticleRatingsRoutes = void 0;
const addArticleRatingsRoutes = (app, client) => {
    app.get("/article-ratings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, articleId } = req.query;
        try {
            const articleRating = (yield client
                .db("deepway")
                .collection("article-ratings")
                .findOne({ userId, articleId }));
            res.status(200).json(articleRating);
        }
        catch (error) {
            console.error("Ошибка получения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    app.post("/article-ratings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { articleId, userId, rate, feedback } = req.body;
        const rating = { articleId, userId, rate, feedback };
        try {
            const result = yield client
                .db("deepway")
                .collection("article-ratings")
                .insertOne(rating);
            res.status(201).json({ _id: result.insertedId.toString() });
        }
        catch (error) {
            console.error("Ошибка сохранения данных", error);
            res.status(500).json({ error: "Ошибка сохранения данных" });
        }
    }));
};
exports.addArticleRatingsRoutes = addArticleRatingsRoutes;
