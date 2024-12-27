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
const getCommentsRouter = (client, mongoDbName) => {
    const router = (0, express_1.Router)();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _expand, articleId } = req.query;
        const pipeline = [{ $match: { articleId: articleId } }];
        if (_expand === "user") {
            pipeline.push({
                $addFields: {
                    userIdObject: {
                        $convert: {
                            input: "$userId",
                            to: "objectId",
                        },
                    },
                },
            }, {
                $lookup: {
                    from: "users",
                    localField: "userIdObject",
                    foreignField: "_id",
                    as: "user",
                },
            }, { $unwind: "$user" }, { $unset: ["userIdObject", "user.password"] });
        }
        try {
            const comments = (yield client
                .db(mongoDbName)
                .collection("comments")
                .aggregate(pipeline)
                .toArray());
            res.json(comments);
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
    router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { articleId, userId, text } = req.body;
        try {
            const comment = { articleId, userId, text };
            const result = yield client
                .db(mongoDbName)
                .collection("comments")
                .insertOne(comment);
            res.status(201).json({ _id: result.insertedId.toString() });
        }
        catch (error) {
            console.error("Ошибка сохранения данных", error);
            res.status(500).json({ error: "Ошибка сохранения данных" });
        }
    }));
    return router;
};
exports.getCommentsRouter = getCommentsRouter;
