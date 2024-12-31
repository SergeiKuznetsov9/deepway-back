"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const login_router_1 = require("./routers/login-router");
const articles_router_1 = require("./routers/articles-router");
const profile_router_1 = require("./routers/profile-router");
const article_ratings_router_1 = require("./routers/article-ratings-router");
const comments_router_1 = require("./routers/comments-router");
const notifications_router_1 = require("./routers/notifications-router");
const article_ratings_service_1 = require("./services/article-ratings-service");
const articles_service_1 = require("./services/articles-service");
const comments_service_1 = require("./services/comments-service");
const login_service_1 = require("./services/login-service");
const notifications_service_1 = require("./services/notifications-service");
const profile_service_1 = require("./services/profile-service");
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
    app.use("/articles", (0, articles_router_1.getArticleRouter)(new articles_service_1.ArticlesService(client, mongoDbName)));
    app.use("/article-ratings", (0, article_ratings_router_1.getArticleRatingsRouter)(new article_ratings_service_1.ArticleRatingsService(client, mongoDbName)));
    app.use("/comments", (0, comments_router_1.getCommentsRouter)(new comments_service_1.CommentsService(client, mongoDbName)));
    app.use("/login", (0, login_router_1.getLoginRouter)(new login_service_1.LoginService(client, mongoDbName)));
    app.use("/profile", (0, profile_router_1.getProfileRouter)(new profile_service_1.ProfileService(client, mongoDbName)));
    app.use("/notifications", (0, notifications_router_1.getNotificationsRouter)(new notifications_service_1.NotificationsService(client, mongoDbName)));
    return app;
};
exports.createApp = createApp;
