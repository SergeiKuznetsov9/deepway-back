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
exports.getCommentsRouter = void 0;
const express_1 = require("express");
const getCommentsRouter = (commentsService) => {
    const router = (0, express_1.Router)();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const comments = yield commentsService.getComments(req.query);
            res.json(comments);
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postResult = yield commentsService.postComment(req.body);
            res.status(201).json(postResult);
        }
        catch (error) {
            console.error("Ошибка сохранения данных", error);
            res.status(500).json({ error: "Ошибка сохранения данных" });
        }
    }));
    return router;
};
exports.getCommentsRouter = getCommentsRouter;
