import { MongoClient } from "mongodb";
import { Profile, ProfilePutBody } from "src/types/models/profile";

export class ProfileService {
  private collection;

  constructor(client: MongoClient, dbName: string) {
    this.collection = client.db(dbName).collection("profile");
  }

  async getProfileByUserId(userId: string) {
    return (await this.collection.findOne({ userId })) as Profile;
  }

  async updateProfileByUserId(userId: string, profilePutBody: ProfilePutBody) {
    return await this.collection.updateOne({ userId }, profilePutBody);
  }
}
