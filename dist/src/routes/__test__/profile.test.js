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
const profiles_1 = require("../../mocks/profiles");
let app;
let db;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    ({ app, db } = yield (0, jest_setup_1.initTestDB)());
    yield db.collection("profile").insertMany((0, profiles_1.getProfilesMocks)());
}));
describe("Profile API", () => {
    it("GET /profile", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/profile/670e4a9955e53c8e609cf176");
        const body = res.body;
        expect(body.userId).toBe("670e4a9955e53c8e609cf176");
    }));
    it("PUT /profile", () => __awaiter(void 0, void 0, void 0, function* () {
        const reqBody = {
            age: "Новое значение",
            avatar: "Новое значение",
            city: "Новое значение",
            country: "Новое значение",
            currency: "Новое значение",
            first: "Новое значение",
            lastname: "Новое значение",
            username: "Новое значение",
        };
        const res = yield (0, supertest_1.default)(app)
            .put("/profile/670e4a9955e53c8e609cf176")
            .send(reqBody);
        const updatedProfile = (yield db
            .collection("profile")
            .findOne({ userId: "670e4a9955e53c8e609cf176" }));
        const isAllUpdated = Object.entries(updatedProfile).every((fieldWithData) => {
            if (fieldWithData[0] !== "userId" && fieldWithData[0] !== "_id") {
                return fieldWithData[1] === "Новое значение";
            }
            return true;
        });
        expect(isAllUpdated).toBe(true);
    }));
});
