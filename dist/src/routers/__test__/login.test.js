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
let app;
let db;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    ({ app, db } = yield (0, jest_setup_1.initTestDB)());
    yield db.collection("users").insertMany((0, users_1.getUsersMocks)());
}));
describe("Login API", () => {
    it("POST /login", () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            username: "admin",
            password: "123",
        };
        const res = yield (0, supertest_1.default)(app).post("/login").send(reqBody);
        const body = res.body;
        expect(body.username).toBe("admin");
        expect("password" in body).toBe(false);
    }));
    it("POST /login", () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            username: "admin",
            password: "124",
        };
        const res = yield (0, supertest_1.default)(app).post("/login").send(reqBody);
        const body = res.body;
        expect(body).toEqual({
            error: "Пользователь с таким именем и паролем не существует",
        });
    }));
});
