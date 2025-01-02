"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleRatingsMocks = void 0;
const mongodb_1 = require("mongodb");
const articleRatings = [
    {
        _id: new mongodb_1.ObjectId("6712595d03a5a45605b1b9d7"),
        articleId: "670e4a0655e53c8e6099fcfa",
        userId: "670e4a9955e53c8e609cf174",
        rate: 4,
        feedback: "",
    },
    {
        _id: new mongodb_1.ObjectId("67126393627095bfd07e805c"),
        articleId: "670e4a0655e53c8e6099fcfb",
        userId: "670e4a9955e53c8e609cf174",
        rate: 3,
        feedback: "",
    },
    {
        _id: new mongodb_1.ObjectId("673f3f568b0d3c3fe74a47ed"),
        articleId: "670e4a0655e53c8e6099fcff",
        userId: "670e4a9955e53c8e609cf174",
        rate: 4,
        feedback: "",
    },
    {
        _id: new mongodb_1.ObjectId("673f3f9aac5d311f2b793eb2"),
        articleId: "670e4a0655e53c8e6099fcfe",
        userId: "670e4a9955e53c8e609cf174",
        rate: 3,
        feedback: "frsdgdtrh",
    },
    {
        _id: new mongodb_1.ObjectId("673f4c8c26965180016d628d"),
        articleId: "670e4a0655e53c8e6099fcfd",
        userId: "670e4a9955e53c8e609cf174",
        rate: 4,
        feedback: "",
    },
    {
        _id: new mongodb_1.ObjectId("6759eccda334719cf1fe36cd"),
        articleId: "670e4a0655e53c8e6099fcff",
        userId: "",
        rate: 4,
        feedback: "",
    },
    {
        _id: new mongodb_1.ObjectId("675bd0bedee2549c2fec650b"),
        articleId: "670e4a0655e53c8e6099fd05",
        userId: "670e4a9955e53c8e609cf174",
        rate: 3,
        feedback: "",
    },
    {
        _id: new mongodb_1.ObjectId("675bdb9d7c39aa7516ab25ec"),
        articleId: "670e4a0655e53c8e6099fd03",
        userId: "670e4a9955e53c8e609cf174",
        rate: 3,
        feedback: "",
    },
    {
        _id: new mongodb_1.ObjectId("675be367d54d4dd3fe47c9ae"),
        articleId: "670e4a0655e53c8e6099fd06",
        userId: "670e4a9955e53c8e609cf174",
        rate: 4,
        feedback: "",
    },
    {
        _id: new mongodb_1.ObjectId("675bec5b1dd8326aeb3285c9"),
        articleId: "670e4a0655e53c8e6099fcf8",
        userId: "670e4a9955e53c8e609cf174",
        rate: 1,
        feedback: "",
    },
];
const getArticleRatingsMocks = () => articleRatings;
exports.getArticleRatingsMocks = getArticleRatingsMocks;
