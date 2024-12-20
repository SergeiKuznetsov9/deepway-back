"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./routes/login");
const articles_1 = require("./routes/articles");
const profile_1 = require("./routes/profile");
const article_ratings_1 = require("./routes/article-ratings");
const comments_1 = require("./routes/comments");
const notifications_1 = require("./routes/notifications");
const db_1 = require("./db");
exports.app = (0, express_1.default)();
exports.app.use((req, res, next) => {
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
exports.app.use(jsonBodyMiddleware);
exports.app.get("/", (_, res) => {
    res.json("Deepway is runing");
});
const loginRoutes = (0, login_1.getLoginRoutes)(db_1.client);
exports.app.use("/login", loginRoutes);
(0, articles_1.addArticleRoutes)(exports.app, db_1.client);
(0, profile_1.addProfileRoutes)(exports.app, db_1.client);
(0, article_ratings_1.addArticleRatingsRoutes)(exports.app, db_1.client);
(0, comments_1.addCommentsRoutes)(exports.app, db_1.client);
(0, notifications_1.addNotificationsRoutes)(exports.app, db_1.client);
