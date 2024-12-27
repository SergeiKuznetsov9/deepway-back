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
const supertest_1 = __importDefault(require("supertest"));
const mongodb_1 = require("mongodb");
const jest_setup_1 = require("../../../jest.setup");
const article_ratings_1 = require("../../mocks/article-ratings");
let app;
let db;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    ({ app, db } = yield (0, jest_setup_1.initTestDB)());
    yield db.collection("article-ratings").insertMany((0, article_ratings_1.getArticleRatingsMocks)());
}));
describe("Article-ratings API", () => {
    it("GET /article-ratings", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            userId: "670e4a9955e53c8e609cf174",
            articleId: "670e4a0655e53c8e6099fcff",
        };
        const res = yield (0, supertest_1.default)(app)
            .get("/article-ratings")
            .query(query);
        const body = res.body;
        expect(body._id).toBe("673f3f568b0d3c3fe74a47ed");
    }));
    it("GET /article-ratings", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            userId: "670",
            articleId: "670",
        };
        const res = yield (0, supertest_1.default)(app)
            .get("/article-ratings")
            .query(query);
        const body = res.body;
        expect(body).toBeNull();
    }));
    it("POST /article-ratings", () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            articleId: "articleId",
            userId: "userId",
            rate: 5,
            feedback: "Тестовый фидбэк",
        };
        const res = yield (0, supertest_1.default)(app)
            .post("/article-ratings")
            .send(reqBody);
        const insertedId = res.body._id;
        const insertedArticleRating = (yield db
            .collection("article-ratings")
            .findOne({ _id: new mongodb_1.ObjectId(insertedId) }));
        expect(insertedArticleRating.feedback).toBe("Тестовый фидбэк");
    }));
});
