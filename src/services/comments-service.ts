import { Db, WithId } from "mongodb";
import {
  Comment,
  CommentGetQuery,
  CommentPostBody,
} from "../types/models/comment-types";

export class CommentsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<Comment>("comments");
  }

  async getComments({ _expand, articleId }: CommentGetQuery) {
    const pipeline: any[] = [{ $match: { articleId: articleId } }];

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
    const postResult = await this.collection.insertOne(postCommentBody);
    return { _id: postResult.insertedId.toString() };
  }
}
