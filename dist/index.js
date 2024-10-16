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
app.get("/articles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let articles = [];
    const { _expand, _sort, _page, _limit, _order, q, type } = req.query;
    const pipeline = [];
    if (type) {
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
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "id",
                as: "user",
            },
        });
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
    }
    res.json(articles);
}));
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Deepway app is listening on port ${port}`);
    });
});
startApp();
