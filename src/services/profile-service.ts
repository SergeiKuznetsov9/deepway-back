import { Db, ObjectId } from "mongodb";
import { ProfilePutBodyInputDTO } from "../types/dtos/profile-dto";
import { ProfileEntity } from "../types/entities/profile-entity";

export class ProfileService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<ProfileEntity>("profile");
  }

  async getProfileByUserId(userId: string) {
    return await this.collection.findOne({ userId });
  }

  async updateProfileByUserId(
    _id: string,
    profilePutBody: ProfilePutBodyInputDTO
  ) {
    return await this.collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...profilePutBody } }
    );
  }
}
