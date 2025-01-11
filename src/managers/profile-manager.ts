import {
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/primary-types";
import { ProfileService } from "../services/profile-service";
import {
  ProfileGetParams,
  ProfilePutBody,
  ProfilePutParams,
} from "../types/models/profile-types";

export class ProfileManager {
  private service;

  constructor(service: ProfileService) {
    this.service = service;
  }

  async handleGetProfileByUserId(req: RequestWithParams<ProfileGetParams>) {
    return await this.service.getProfileByUserId(req.params.userId);
  }

  async handleUpdateProfileByUserId(
    req: RequestWithParamsAndBody<ProfilePutParams, ProfilePutBody>
  ) {
    return await this.service.updateProfileByUserId(
      req.params.userId,
      req.body
    );
  }
}
