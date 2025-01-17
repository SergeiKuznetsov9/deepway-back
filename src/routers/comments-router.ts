import { Response, Router } from "express";

import {
  ErrorMessage,
  MessageWithEntityId,
} from "../types/messages-types";
import { RequestWithBody, RequestWithQuery } from "../types/primary-types";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";
import {
  getCommentGetQueryValidator,
  getCommentPostBodyValidator,
} from "../middlewares/inputValidators/comments-validators";
import { CommentsManager } from "../managers/comments-manager";
import {
  CommentGetInputDTO,
  CommentGetOutputDTO,
  CommentPostInputDTO,
} from "../types/dtos/comment-dto";

export const getCommentsRouter = (manager: CommentsManager) => {
  const router = Router();

  router.get(
    "/",
    getCommentGetQueryValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithQuery<CommentGetInputDTO>,
      res: Response<CommentGetOutputDTO[] | ErrorMessage>
    ) => {
      try {
        const comments = await manager.handleGetComments(req);
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
      req: RequestWithBody<CommentPostInputDTO>,
      res: Response<MessageWithEntityId | ErrorMessage>
    ) => {
      try {
        const postResult = await manager.handlePostComment(req);
        res.status(201).json(postResult);
      } catch (error) {
        console.error("Ошибка сохранения данных", error);
        res.status(500).json({ error: "Ошибка сохранения данных" });
      }
    }
  );

  return router;
};
