import {
  CommentGetInputDTO,
  CommentGetOutputDTO,
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
    const comments = await this.service.getComments(req.query);
    const commentsAdapted: CommentGetOutputDTO[] = comments.map((comment) => ({
      _id: comment._id.toString(),
      text: comment.text,
      articleId: comment.articleId,
      userId: comment.userId,
      user: comment.user,
    }));

    return commentsAdapted;
  }

  async handlePostComment(req: RequestWithBody<CommentPostInputDTO>) {
    const postResult = await this.service.postComment(req.body);
    if (!postResult || !postResult.insertedId) {
      throw new Error("Не удалось сохранить коментарий");
    }
    return { _id: postResult.insertedId.toString() };
  }
}
