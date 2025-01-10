import { Response, Router } from "express";

import { ErrorMessage, MessageWithEntityId } from "../types/models/messages-types";
import { RequestWithBody, RequestWithQuery } from "../types/primary-types";
import { CommentGetQuery, CommentPostBody } from "../types/models/comment-types";
import { CommentsService } from "../services/comments-service";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";
import {
  getCommentGetQueryValidator,
  getCommentPostBodyValidator,
} from "../middlewares/inputValidators/comments-validators";

export const getCommentsRouter = (commentsService: CommentsService) => {
  const router = Router();

  router.get(
    "/",
    getCommentGetQueryValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithQuery<CommentGetQuery>,
      res: Response<Comment[] | ErrorMessage>
    ) => {
      try {
        const comments = await commentsService.getComments(req.query);
        res.json(comments);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
      }
    }
  );

  router.post(
    "/",
    getCommentPostBodyValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithBody<CommentPostBody>,
      res: Response<MessageWithEntityId | ErrorMessage>
    ) => {
      try {
        const postResult = await commentsService.postComment(req.body);
        res.status(201).json(postResult);
      } catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
      }
    }
  );

  return router;
};
