import { Router, Response, NextFunction } from "express";

import { SuccessMessage } from "../types/messages-types";
import {
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/primary-types";
import {
  getProfileGetParamsValidator,
  getProfilePutBodyValidator,
  getProfilePutParamsValidator,
} from "../middlewares/inputValidators/profile-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";
import { ProfileManager } from "../managers/profile-manager";
import {
  ProfileGetInputDTO,
  ProfileGetOutputDTO,
  ProfilePutBodyInputDTO,
  ProfilePutInputDTO,
} from "../types/dtos/profile-dto";
import { DatabaseError } from "../errors/database-error";

export const getProfileRouter = (manager: ProfileManager) => {
  const router = Router();

  router.get(
    "/:userId",
    getProfileGetParamsValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithParams<ProfileGetInputDTO>,
      res: Response<ProfileGetOutputDTO | null>,
      next: NextFunction
    ) => {
      try {
        const profile = await manager.handleGetProfileByUserId(req);
        res.json(profile);
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    "/:userId",
    getProfilePutParamsValidator(),
    getProfilePutBodyValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithParamsAndBody<ProfilePutInputDTO, ProfilePutBodyInputDTO>,
      res: Response<SuccessMessage>,
      next: NextFunction
    ): Promise<void> => {
      try {
        const updateResult = await manager.handleUpdateProfileByUserId(req);
        if (updateResult.matchedCount === 0) {
          throw new DatabaseError();
        }

        res.status(200).json({ message: "Профиль обновлён" });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};
