import { Router, Response, NextFunction } from "express";
import { ErrorMessage } from "express-validator/lib/base";
import { MessageWithEntityId } from "../types/models/messages-types";
import { RequestWithBody } from "../types/primary-types";
import { UserManager } from "../managers/user-manager";
import { UserLoginInputDTO, UserLoginOutputDTO } from "../types/dtos/user-dto";

export const getUserRouter = (manager: UserManager) => {
  const router = Router();

  router.post(
    "/registration",
    async (
      req: RequestWithBody<UserLoginInputDTO>,
      res: Response<MessageWithEntityId | ErrorMessage>,
      next: NextFunction
    ) => {
      try {
        const postResult = await manager.handlePostUser(req);
        res.status(201).json(postResult);
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/login",
    async (
      req: RequestWithBody<UserLoginInputDTO>,
      res: Response<UserLoginOutputDTO | ErrorMessage>,
      next: NextFunction
    ) => {
      try {
        const userLoginOutputDTO = await manager.checkCredentials(req);
        res.status(201).json(userLoginOutputDTO);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
