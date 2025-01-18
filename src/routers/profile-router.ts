import { Router, Response } from "express";
import { WithId } from "mongodb";

import { ErrorMessage, SuccessMessage } from "../types/messages-types";
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

export const getProfileRouter = (manager: ProfileManager) => {
  const router = Router();

  router.get(
    "/:userId",
    getProfileGetParamsValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithParams<ProfileGetInputDTO>,
      res: Response<ProfileGetOutputDTO | ErrorMessage | null>
    ) => {
      try {
        const profile = await manager.handleGetProfileByUserId(req);
        res.json(profile);
      } catch (error) {
        console.error("Ошибка чтения данных", error);
        res.status(500).json({ error: "Ошибка получения данных" });
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
      res: Response<ErrorMessage | SuccessMessage>
    ): Promise<void> => {
      try {
        const updateResult = await manager.handleUpdateProfileByUserId(req);
        if (updateResult.matchedCount === 0) {
          res.status(404).json({ error: "Профиль не найден" });
          return;
        }

        res.status(200).json({ message: "Профиль обновлён" });
      } catch (error) {
        console.error("Ошибка обновления данных", error);
        res.status(500).json({ error: "Ошибка обновления данных" });
      }
    }
  );

  return router;
};
