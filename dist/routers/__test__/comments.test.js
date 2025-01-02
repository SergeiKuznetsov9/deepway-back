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
const comments_1 = require("../../mocks/comments");
const users_1 = require("../../mocks/users");
let app;
let db;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    ({ app, db } = yield (0, jest_setup_1.initTestDB)());
    yield db.collection("comments").insertMany((0, comments_1.getCommentsMocks)());
    yield db.collection("users").insertMany((0, users_1.getUsersMocks)());
}));
describe("Comments API", () => {
    it("GET /comments", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            articleId: "670e4a0655e53c8e6099fcf2",
        };
        const res = yield (0, supertest_1.default)(app).get("/comments").query(query);
        const body = res.body;
        const isCorrectComments = body.every((comment) => comment.articleId === query.articleId);
        const isNoUserData = body.every((comment) => !("user" in comment));
        expect(body.length).not.toBe(0);
        expect(isCorrectComments).toBe(true);
        expect(isNoUserData).toBe(true);
    }));
    it("GET /comments", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            articleId: "670e4a0655e53c8e6099fcf2",
            _expand: "user",
        };
        const res = yield (0, supertest_1.default)(app).get("/comments").query(query);
        const body = res.body;
        const isCorrectComments = body.every((comment) => comment.articleId === query.articleId);
        const isUserData = body.every((comment) => "user" in comment);
        expect(body.length).not.toBe(0);
        expect(isCorrectComments).toBe(true);
        expect(isUserData).toBe(true);
    }));
    it("POST /comments", () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            articleId: "articleId",
            userId: "userId",
            text: "Тестовый коммент",
        };
        const res = yield (0, supertest_1.default)(app).post("/comments").send(reqBody);
        const insertedId = res.body._id;
        const insertedComment = (yield db
            .collection("comments")
            .findOne({ _id: new mongodb_1.ObjectId(insertedId) }));
        expect(insertedComment.text).toBe("Тестовый коммент");
    }));
});
