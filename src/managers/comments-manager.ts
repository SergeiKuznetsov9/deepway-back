import {
  CommentGetQuery,
  CommentPostBody,
} from "../types/models/comment-types";
import { CommentsService } from "../services/comments-service";
import { RequestWithBody, RequestWithQuery } from "../types/primary-types";

export class CommentsManager {
  private service;

  constructor(service: CommentsService) {
    this.service = service;
  }

  async handleGetComments(req: RequestWithQuery<CommentGetQuery>) {
    return await this.service.getComments(req.query);
  }

  async handlePostComment(req: RequestWithBody<CommentPostBody>) {
    const postResult = await this.service.postComment(req.body);
    return { _id: postResult.insertedId.toString() };
  }
}
