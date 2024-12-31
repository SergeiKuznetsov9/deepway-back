import { MongoClient, ObjectId } from "mongodb";
import { Profile, ProfilePutBody } from "src/types/models/profile";

export class ProfileService {
  private collection;

  constructor(client: MongoClient, dbName: string) {
    this.collection = client.db(dbName).collection("profile");
  }

  async getProfileByUserId(userId: string) {
    return (await this.collection.findOne({ userId })) as Profile;
  }

  async updateProfileByUserId(_id: string, profilePutBody: ProfilePutBody) {
    return await this.collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...profilePutBody } }
    );
  }
}
