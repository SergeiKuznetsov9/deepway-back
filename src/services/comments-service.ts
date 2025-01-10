import { MongoClient } from "mongodb";
import { CommentGetQuery, CommentPostBody } from "../types/models/comment-types";

export class CommentsService {
  private collection;

  constructor(client: MongoClient, dbName: string) {
    this.collection = client.db(dbName).collection("comments");
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

    return (await this.collection.aggregate(pipeline).toArray()) as Comment[];
  }

  async postComment(postCommentBody: CommentPostBody) {
    const postResult = await this.collection.insertOne(postCommentBody);
    return { _id: postResult.insertedId.toString() };
  }
}
