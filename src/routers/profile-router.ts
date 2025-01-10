import { Router, Response } from "express";

import { ErrorMessage, SuccessMessage } from "../types/models/messages";
import { RequestWithParams, RequestWithParamsAndBody } from "../types/types";
import {
  Profile,
  ProfileGetParams,
  ProfilePutBody,
  ProfilePutParams,
} from "../types/models/profile";
import { ProfileService } from "../services/profile-service";
import {
  getProfileGetParamsValidator,
  getProfilePutBodyValidator,
  getProfilePutParamsValidator,
} from "../middlewares/inputValidators/profile-validators";
import { inputValidationMiddleware } from "../middlewares/inputValidators/common-validators";

export const getProfileRouter = (profileService: ProfileService) => {
  const router = Router();

  router.get(
    "/:userId",
    getProfileGetParamsValidator(),
    inputValidationMiddleware,
    async (
      req: RequestWithParams<ProfileGetParams>,
      res: Response<Profile | ErrorMessage>
    ) => {
      try {
        const profile = await profileService.getProfileByUserId(
          req.params.userId
        );
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
      req: RequestWithParamsAndBody<ProfilePutParams, ProfilePutBody>,
      res: Response<ErrorMessage | SuccessMessage>
    ): Promise<void> => {
      try {
        const updateResult = await profileService.updateProfileByUserId(
          req.params.userId,
          req.body
        );
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
