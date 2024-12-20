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
exports.addArticleRoutes = void 0;
const mongodb_1 = require("mongodb");
const addArticleRoutes = (app, client) => {
    app.get("/articles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let articles = [];
        const { _expand, _sort, _page, _limit, _order, q, type } = req.query;
        const pipeline = [];
        if (type && type !== "ALL") {
            pipeline.push({
                $match: {
                    type: type,
                },
            });
        }
        if (q) {
            pipeline.push({
                $match: {
                    title: { $regex: q, $options: "i" },
                },
            });
        }
        if (_sort) {
            const sortOrder = _order === "desc" ? -1 : 1;
            if (_sort === "created") {
                pipeline.push({
                    $addFields: {
                        parsedDate: {
                            $dateFromString: {
                                dateString: "$createdAt",
                                format: "%d.%m.%Y",
                            },
                        },
                    },
                }, {
                    $sort: { parsedDate: sortOrder },
                });
            }
            if (_sort === "title") {
                pipeline.push({
                    $addFields: {
                        titleLower: { $toLower: "$title" },
                    },
                }, {
                    $sort: { titleLower: sortOrder },
                }, {
                    $project: {
                        titleLower: 0,
                    },
                });
            }
            if (_sort === "views") {
                pipeline.push({
                    $sort: { views: sortOrder },
                });
            }
        }
        if (_limit && !_page) {
            pipeline.push({
                $limit: Number(_limit),
            });
        }
        if (_limit && _page) {
            const skip = (Number(_page) - 1) * Number(_limit);
            pipeline.push({
                $skip: skip,
            });
            pipeline.push({
                $limit: Number(_limit),
            });
        }
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
            }, { $unwind: "$user" }, { $unset: ["user.password"] });
        }
        try {
            articles = (yield client
                .db("deepway")
                .collection("articles")
                .aggregate(pipeline)
                .toArray());
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
            return;
        }
        res.json(articles);
    }));
    app.get("/articles/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const requestedId = req.params.id;
        try {
            const article = (yield client
                .db("deepway")
                .collection("articles")
                .aggregate([
                { $match: { _id: new mongodb_1.ObjectId(requestedId) } },
                {
                    $addFields: {
                        userIdObject: {
                            $convert: {
                                input: "$userId",
                                to: "objectId",
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userIdObject",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                { $unwind: "$user" },
                { $unset: ["userIdObject", "user.password"] },
            ])
                .next());
            res.json(article);
        }
        catch (error) {
            console.error("Ошибка чтения данных", error);
            res.status(500).json({ error: "Ошибка получения данных" });
        }
    }));
};
exports.addArticleRoutes = addArticleRoutes;
