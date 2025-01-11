import { Db, ObjectId } from "mongodb";
import { Profile, ProfilePutBody } from "../types/models/profile-types";

export class ProfileService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<Profile>("profile");
  }

  async getProfileByUserId(userId: string) {
    return await this.collection.findOne({ userId });
  }

  async updateProfileByUserId(_id: string, profilePutBody: ProfilePutBody) {
    return await this.collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...profilePutBody } }
    );
  }
}
