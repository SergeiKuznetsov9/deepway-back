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
const notifications_1 = require("../../mocks/notifications");
let app;
let db;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    ({ app, db } = yield (0, jest_setup_1.initTestDB)());
    yield db.collection("notifications").insertMany((0, notifications_1.getNotificationsMocks)());
}));
describe("Notifications API", () => {
    it("GET /notifications", () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = "670e4a9955e53c8e609cf174";
        const res = yield (0, supertest_1.default)(app).get(`/notifications/${userId}`);
        const body = res.body;
        const isCorrectNotifications = body.every((notification) => notification.userId === userId);
        expect(isCorrectNotifications).toBe(true);
    }));
});
