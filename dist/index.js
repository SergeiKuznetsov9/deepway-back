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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
app.get("/", (req, res) => {
    res.json("Deepway is runing");
});
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.client
            .db("deepway")
            .collection("users")
            .findOne({ username, password }, { projection: { password: 0 } });
        if (user) {
            res.status(200).json(user);
        }
        else {
            res
                .status(404)
                .json({ error: "Пользователь с таким именем и паролем не существует" });
        }
    }
    catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
    }
}));
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
        articles = (yield db_1.client
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
        const article = (yield db_1.client
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
app.get("/profile/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const profile = yield db_1.client
            .db("deepway")
            .collection("profile")
            .findOne({ userId });
        res.json(profile);
    }
    catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
    }
}));
app.put("/profile/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, age, avatar, city, country, currency, first, lastname, username, } = req.body;
    try {
        const userId = req.params.userId;
        const result = yield db_1.client.db("deepway").collection("profile").updateOne({ userId }, {
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
            return res.status(404).json({ error: "Профиль не найден" });
        }
        res.status(200).json({ message: "Профиль обновлён" });
    }
    catch (error) {
        console.error("Ошибка обновления данных", error);
        res.status(500).json({ error: "Ошибка обновления данных" });
    }
}));
app.get("/article-ratings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, articleId } = req.query;
    try {
        const articleRating = yield db_1.client
            .db("deepway")
            .collection("article-ratings")
            .findOne({ userId, articleId });
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
        const result = yield db_1.client
            .db("deepway")
            .collection("article-ratings")
            .insertOne(rating);
        res.status(201).json({ id: result.insertedId.toString() });
    }
    catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
    }
}));
app.get("/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const comments = (yield db_1.client
            .db("deepway")
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
app.post("/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { articleId, userId, text } = req.body;
    try {
        const comment = { articleId, userId, text };
        const result = yield db_1.client
            .db("deepway")
            .collection("comments")
            .insertOne(comment);
        res.status(201).json({ id: result.insertedId.toString() });
    }
    catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
    }
}));
app.get("/notifications/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const notifications = yield db_1.client
            .db("deepway")
            .collection("notifications")
            .find({ userId })
            .toArray();
        res.json(notifications);
    }
    catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
    }
}));
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Deepway app is listening on port ${port}`);
    });
});
startApp();
