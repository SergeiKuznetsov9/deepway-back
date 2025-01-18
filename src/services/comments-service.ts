import { Db, WithId } from "mongodb";
import { Pipeline } from "../types/primary-types";
import { CommentEntity } from "../types/entities/comment-entity";
import {
  CommentGetInputDTO,
  CommentPostInputDTO,
} from "../types/dtos/comment-dto";
import { User } from "../types/models/user-types";
import { DatabaseError } from "../errors/database-error";
import { Errors } from "../constants/errors-constants";

export class CommentsService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<CommentEntity>("comments");
  }

  async getComments({ _expand, articleId }: CommentGetInputDTO) {
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

    try {
      return await this.collection
        .aggregate<WithId<CommentEntity & { user?: User }>>(pipeline)
        .toArray();
    } catch (error) {
      console.error(Errors.DBGet, error);
      throw new DatabaseError(Errors.DBGet);
    }
  }

  async postComment(postCommentBody: CommentPostInputDTO) {
    try {
      return await this.collection.insertOne(postCommentBody);
    } catch (error) {
      console.error(Errors.DBInsert, error);
      throw new DatabaseError(Errors.DBInsert);
    }
  }
}
