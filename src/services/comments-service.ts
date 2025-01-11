import { Db, WithId } from "mongodb";
import {
  Comment,
  CommentGetQuery,
  CommentPostBody,
} from "../types/models/comment-types";
import { Pipeline } from "../types/primary-types";

export class CommentsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<Comment>("comments");
  }

  async getComments({ _expand, articleId }: CommentGetQuery) {
    const pipeline: Pipeline = [{ $match: { articleId: articleId } }];

    if (_expand === "user") {
      pipeline.push(
        {
          $addFields: {
            userIdObject: {
              $convert: {
                input: "$userId",
                to: "objectId",
              },
            },
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "userIdObject",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $unset: ["userIdObject", "user.password"] }
      );
    }

    return await this.collection.aggregate<WithId<Comment>>(pipeline).toArray();
  }

  async postComment(postCommentBody: CommentPostBody) {
    return await this.collection.insertOne(postCommentBody);
  }
}
