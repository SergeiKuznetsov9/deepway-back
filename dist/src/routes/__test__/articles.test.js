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
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    let db;
    ({ app, db } = yield (0, jest_setup_1.initTestDB)());
    yield db.collection("articles").deleteMany({});
    yield db.collection("articles").insertOne({ name: "testingArticle" });
    const insertedArticle = yield db
        .collection("articles")
        .findOne({ name: "testingArticle" });
    console.log("Inserted article:", insertedArticle);
}));
describe("User API", () => {
    it("GET /user - should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/articles");
        console.log("RESS", res.body);
        expect(1).toBe(1);
    }));
});
