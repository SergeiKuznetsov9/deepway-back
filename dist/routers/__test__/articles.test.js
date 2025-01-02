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
const jest_setup_1 = require("../../../jest.setup");
const users_1 = require("../../mocks/users");
const articles_1 = require("../../mocks/articles");
const checkRightNumberSubsequence = (order, checkingArray) => checkingArray.every((number, index) => {
    if (index > 0 && order === "asc") {
        return number >= checkingArray[index - 1];
    }
    if (index > 0 && order === "desc") {
        return number <= checkingArray[index - 1];
    }
    return true;
});
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    let db;
    ({ app, db } = yield (0, jest_setup_1.initTestDB)());
    yield db.collection("articles").insertMany((0, articles_1.getArticlesMocks)());
    yield db.collection("users").insertMany((0, users_1.getUsersMocks)());
}));
describe("Articles API", () => {
    it("GET /articles", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/articles");
        expect(res.body.length).toBe(21);
    }));
    it("GET /articles?_limit=9", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            _limit: 9,
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        expect(res.body.length).toBe(9);
    }));
    it("GET /articles?_limit=9&_page=2", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            _limit: 3,
            _page: 2,
        };
        const correctResultsIds = [
            "670e4a0655e53c8e6099fcf5",
            "670e4a0655e53c8e6099fcf6",
            "670e4a0655e53c8e6099fcf7",
        ];
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const resIdsArray = res.body.map((article) => article._id);
        expect(resIdsArray).toEqual(correctResultsIds);
    }));
    it("GET /articles?_expand=user", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            _expand: "user",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const isUserInArticle = res.body.every((article) => "user" in article);
        expect(isUserInArticle).toBe(true);
    }));
    it("GET /articles?_expand=user1", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            _expand: "user1",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const isUserInArticle = res.body.some((article) => "user" in article);
        expect(isUserInArticle).toBe(false);
    }));
    it("GET /articles?q=reac", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            q: "reac",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const isQMatchesWithResult = res.body.every((article) => article.title.toLowerCase().includes(query.q));
        expect(isQMatchesWithResult).toBe(true);
    }));
    it("GET /articles?q=feshjfjehbdwadw", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            q: "feshjfjehbdwadw",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        expect(res.body.length).toBe(0);
    }));
    it("GET /articles?type=IT", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            type: "IT",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const isAllTypesMatches = res.body.every((article) => article.type.includes("IT"));
        expect(isAllTypesMatches).toBe(true);
    }));
    it("GET /articles?type=ECONOMICS", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            type: "ECONOMICS",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const isAllTypesMatches = res.body.every((article) => article.type.includes("ECONOMICS"));
        expect(isAllTypesMatches).toBe(true);
    }));
    it("GET /articles?type=SCIENCE", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            type: "SCIENCE",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const isAllTypesMatches = res.body.every((article) => article.type.includes("SCIENCE"));
        expect(isAllTypesMatches).toBe(true);
    }));
    it("GET /articles?_sort=created&_order=asc", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            _sort: "created",
            _order: "asc",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const datesArray = res.body.map((article) => {
            const articleDate = article.createdAt;
            const [day, month, year] = articleDate.split(".").map(Number);
            return new Date(year, month - 1, day).getTime();
        });
        const isCorrectSubsequence = checkRightNumberSubsequence(query._order, datesArray);
        expect(isCorrectSubsequence).toBe(true);
    }));
    it("GET /articles?_sort=created&_order=desc", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            _sort: "created",
            _order: "desc",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const datesArray = res.body.map((article) => {
            const articleDate = article.createdAt;
            const [day, month, year] = articleDate.split(".").map(Number);
            return new Date(year, month - 1, day).getTime();
        });
        const isCorrectSubsequence = checkRightNumberSubsequence(query._order, datesArray);
        expect(isCorrectSubsequence).toBe(true);
    }));
    it("GET /articles?_sort=views&_order=asc", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            _sort: "views",
            _order: "asc",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const viewsArray = res.body.map((article) => article.views);
        const isCorrectSubsequence = checkRightNumberSubsequence(query._order, viewsArray);
        expect(isCorrectSubsequence).toBe(true);
    }));
    it("GET /articles?_sort=views&_order=desc", () => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            _sort: "views",
            _order: "desc",
        };
        const res = yield (0, supertest_1.default)(app).get("/articles").query(query);
        const viewsArray = res.body.map((article) => article.views);
        const isCorrectSubsequence = checkRightNumberSubsequence(query._order, viewsArray);
        expect(isCorrectSubsequence).toBe(true);
    }));
    it("GET /articles/670e4a0655e53c8e6099fcf7", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/articles/670e4a0655e53c8e6099fcf7");
        expect(res.body._id).toBe("670e4a0655e53c8e6099fcf7");
    }));
});
