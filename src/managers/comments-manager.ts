import {
  CommentGetInputDTO,
  CommentPostInputDTO,
} from "../types/dtos/comment-dto";
import { CommentsService } from "../services/comments-service";
import { RequestWithBody, RequestWithQuery } from "../types/primary-types";

export class CommentsManager {
  private service;

  constructor(service: CommentsService) {
    this.service = service;
  }

  async handleGetComments(req: RequestWithQuery<CommentGetInputDTO>) {
    return await this.service.getComments(req.query);
  }

  async handlePostComment(req: RequestWithBody<CommentPostInputDTO>) {
    const postResult = await this.service.postComment(req.body);
    if (!postResult || !postResult.insertedId) {
      throw new Error("Не удалось сохранить коментарий");
    }
    return { _id: postResult.insertedId.toString() };
  }
}
