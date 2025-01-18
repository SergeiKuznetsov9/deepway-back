import { NextFunction, Response, Router } from "express";
import {
  EmailSendInfoOutputDTO,
  EmailSendInputDTO,
} from "../types/dtos/email-dto";
import { RequestWithBody } from "../types/primary-types";
import { EmailManager } from "../managers/email-manager";

export const getEmailRouter = (manager: EmailManager) => {
  const router = Router();

  router.post(
    "/",
    async (
      req: RequestWithBody<EmailSendInputDTO>,
      res: Response<EmailSendInfoOutputDTO>,
      next: NextFunction
    ) => {
      try {
        const sendResult = await manager.handleSendEmail(req);
        res.status(200).json(sendResult);
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
