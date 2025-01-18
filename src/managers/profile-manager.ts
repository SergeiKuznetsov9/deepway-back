import {
  RequestWithParams,
  RequestWithParamsAndBody,
} from "../types/primary-types";
import { ProfileService } from "../services/profile-service";
import {
  ProfileGetInputDTO,
  ProfileGetOutputDTO,
  ProfilePutBodyInputDTO,
  ProfilePutInputDTO,
} from "../types/dtos/profile-dto";

export class ProfileManager {
  private service;

  constructor(service: ProfileService) {
    this.service = service;
  }

  async handleGetProfileByUserId(req: RequestWithParams<ProfileGetInputDTO>) {
    const profile = await this.service.getProfileByUserId(req.params.userId);

    if (profile === null) {
      return profile;
    }

    const profileAdapted: ProfileGetOutputDTO = {
      _id: profile._id.toString(),
      first: profile.first,
      lastname: profile.lastname,
      age: profile.age,
      currency: profile.currency,
      country: profile.country,
      city: profile.city,
      username: profile.username,
      avatar: profile.avatar,
      userId: profile.userId,
    };

    return profileAdapted;
  }

  async handleUpdateProfileByUserId(
    req: RequestWithParamsAndBody<ProfilePutInputDTO, ProfilePutBodyInputDTO>
  ) {
    return await this.service.updateProfileByUserId(
      req.params.userId,
      req.body
    );
  }
}
