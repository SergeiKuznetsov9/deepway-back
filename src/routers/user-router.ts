import { Router, Response, NextFunction } from "express";
import { MessageWithEntityId } from "../types/messages-types";
import { RequestWithBody } from "../types/primary-types";
import { UserManager } from "../managers/user-manager";
import { UserLoginInputDTO, UserLoginOutputDTO } from "../types/dtos/user-dto";

export const getUserRouter = (manager: UserManager) => {
  const router = Router();

  router.post(
    "/registration",
    async (
      req: RequestWithBody<UserLoginInputDTO>,
      res: Response<MessageWithEntityId>,
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
      res: Response<UserLoginOutputDTO>,
      next: NextFunction
    ) => {
      try {
        const userLoginOutputDTO = await manager.checkCredentials(req);
        res.status(200).json(userLoginOutputDTO);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
