"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersMocks = void 0;
const mongodb_1 = require("mongodb");
const users = [
    {
        _id: new mongodb_1.ObjectId("670e4a9955e53c8e609cf174"),
        username: "admin",
        roles: ["ADMIN"],
        password: "123",
        avatar: "https://rp-wow.ru/upload/056/u5682/59/80/20811.jpg",
        features: {
            isArticleRatingAvailable: true,
            isAppRedesigned: true,
        },
    },
    {
        _id: new mongodb_1.ObjectId("670e4a9955e53c8e609cf175"),
        username: "user",
        password: "123",
        roles: ["USER"],
        avatar: "https://avatars.dzeninfra.ru/get-zen_doc/4467222/pub_62439a0d9f5e0b1fbda46cdc_62463860b752554f8054c8c8/scale_12006",
        features: {
            isAppRedesigned: true,
            isArticleRatingAvailable: true,
        },
    },
    {
        _id: new mongodb_1.ObjectId("670e4a9955e53c8e609cf176"),
        username: "manager",
        password: "123",
        roles: ["MANAGER"],
        avatar: "https://avatars.dzeninfra.ru/get-zen_doc/4467222/pub_62439a0d9f5e0b1fbda46cdc_62463860b752554f8054c8c8/scale_1200",
        features: {
            isArticleRatingAvailable: false,
            isAppRedesigned: false,
        },
    },
];
const getUsersMocks = () => users;
exports.getUsersMocks = getUsersMocks;
