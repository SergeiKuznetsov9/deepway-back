"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./routes/login");
const articles_1 = require("./routes/articles");
const profile_1 = require("./routes/profile");
const article_ratings_1 = require("./routes/article-ratings");
const comments_1 = require("./routes/comments");
const notifications_1 = require("./routes/notifications");
const createApp = (client, mongoDbName) => {
    const app = (0, express_1.default)();
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
        if (req.method === "OPTIONS") {
            res.sendStatus(204);
            return;
        }
        next();
    });
    const jsonBodyMiddleware = express_1.default.json();
    app.use(jsonBodyMiddleware);
    app.get("/", (_, res) => {
        res.json("Deepway is runing");
    });
    app.use("/login", (0, login_1.getLoginRoutes)(client, mongoDbName));
    app.use("/articles", (0, articles_1.getArticleRoutes)(client, mongoDbName));
    app.use("/profile", (0, profile_1.getProfileRoutes)(client, mongoDbName));
    app.use("/article-ratings", (0, article_ratings_1.getArticleRatingsRoutes)(client, mongoDbName));
    app.use("/comments", (0, comments_1.getCommentsRoutes)(client, mongoDbName));
    app.use("/notifications", (0, notifications_1.getNotificationsRoutes)(client, mongoDbName));
    return app;
};
exports.createApp = createApp;
