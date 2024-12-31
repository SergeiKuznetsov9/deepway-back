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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
class CommentsService {
    constructor(client, dbName) {
        this.collection = client.db(dbName).collection("comments");
    }
    getComments(_a) {
        return __awaiter(this, arguments, void 0, function* ({ _expand, articleId }) {
            const pipeline = [{ $match: { articleId: articleId } }];
            if (_expand === "user") {
                pipeline.push({
                    $addFields: {
                        userIdObject: {
                            $convert: {
                                input: "$userId",
                                to: "objectId",
                            },
                        },
                    },
                }, {
                    $lookup: {
                        from: "users",
                        localField: "userIdObject",
                        foreignField: "_id",
                        as: "user",
                    },
                }, { $unwind: "$user" }, { $unset: ["userIdObject", "user.password"] });
            }
            return (yield this.collection.aggregate(pipeline).toArray());
        });
    }
    postComment(postCommentBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const postResult = yield this.collection.insertOne(postCommentBody);
            return { _id: postResult.insertedId.toString() };
        });
    }
}
exports.CommentsService = CommentsService;
