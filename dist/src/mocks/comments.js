"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsMocks = void 0;
const mongodb_1 = require("mongodb");
const comments = [
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a0f"),
        text: "some comment",
        articleId: "670e4a0655e53c8e6099fcf2",
        userId: "670e4a9955e53c8e609cf174",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a10"),
        text: "some comment 2",
        articleId: "670e4a0655e53c8e6099fcf2",
        userId: "670e4a9955e53c8e609cf174",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a11"),
        text: "some comment 3",
        articleId: "670e4a0655e53c8e6099fcf2",
        userId: "670e4a9955e53c8e609cf175",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a12"),
        articleId: "670e4a0655e53c8e6099fcf2",
        userId: "670e4a9955e53c8e609cf174",
        text: "feaf",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a13"),
        articleId: "670e4a0655e53c8e6099fcf3",
        userId: "670e4a9955e53c8e609cf174",
        text: "Фигня какая-то",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a14"),
        articleId: "670e4a0655e53c8e6099fcf2",
        userId: "670e4a9955e53c8e609cf174",
        text: "Какой-то коммент",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a15"),
        articleId: "670e4a0655e53c8e6099fcf2",
        userId: "670e4a9955e53c8e609cf174",
        text: "dwad",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a16"),
        articleId: "670e4a0655e53c8e6099fcf4",
        userId: "670e4a9955e53c8e609cf174",
        text: "lijil",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a17"),
        articleId: "670e4a0655e53c8e6099fcf3",
        userId: "670e4a9955e53c8e609cf174",
        text: "Хорошая статья",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a18"),
        articleId: "670e4a0655e53c8e6099fcf2",
        userId: "670e4a9955e53c8e609cf174",
        text: "Новый коммент",
    },
    {
        _id: new mongodb_1.ObjectId("670e4b1a55e53c8e609f8a19"),
        articleId: "670e4a0655e53c8e6099fcf3",
        userId: "670e4a9955e53c8e609cf174",
        text: "Статья не очень",
    },
    {
        _id: new mongodb_1.ObjectId("670fc60716488db47383be7d"),
        articleId: "670e4a0655e53c8e6099fcf7",
        userId: "670e4a9955e53c8e609cf176",
        text: "Постман комментарий",
    },
    {
        _id: new mongodb_1.ObjectId("670fc7ce043fd189e1363c70"),
        articleId: "670e4a0655e53c8e6099fcf7",
        userId: "670e4a9955e53c8e609cf176",
        text: "Еще один Постман комментарий",
    },
    {
        _id: new mongodb_1.ObjectId("67124f1858fba0f7eab7affb"),
        articleId: "670e4a0655e53c8e6099fcff",
        userId: "670e4a9955e53c8e609cf174",
        text: "норм",
    },
    {
        _id: new mongodb_1.ObjectId("671261cd0eea7255f38e8400"),
        articleId: "670e4a0655e53c8e6099fcff",
        userId: "670e4a9955e53c8e609cf174",
        text: "test",
    },
    {
        _id: new mongodb_1.ObjectId("6712638c627095bfd07e805b"),
        articleId: "670e4a0655e53c8e6099fcfb",
        userId: "670e4a9955e53c8e609cf174",
        text: "Test",
    },
    {
        _id: new mongodb_1.ObjectId("673f3fabac5d311f2b793eb3"),
        articleId: "670e4a0655e53c8e6099fcfe",
        userId: "670e4a9955e53c8e609cf174",
        text: "gdrgrd",
    },
    {
        _id: new mongodb_1.ObjectId("675cb2d5f8064ab407b4c922"),
        articleId: "670e4a0655e53c8e6099fcf2",
        userId: "670e4a9955e53c8e609cf174",
        text: "Очень интересно",
    },
];
const getCommentsMocks = () => comments;
exports.getCommentsMocks = getCommentsMocks;
