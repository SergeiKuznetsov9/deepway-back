import { Db, ObjectId } from "mongodb";
import { ProfilePutBodyInputDTO } from "../types/dtos/profile-dto";
import { ProfileEntity } from "../types/entities/profile-entity";
import { DatabaseError } from "../errors/database-error";
import { Errors } from "../constants/errors-constants";

export class ProfileService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<ProfileEntity>("profile");
  }

  async getProfileByUserId(userId: string) {
    try {
      return await this.collection.findOne({ userId });
    } catch (error) {
      console.error(Errors.DBGet, error);
      throw new DatabaseError(Errors.DBGet);
    }
  }

  async updateProfileByUserId(
    _id: string,
    profilePutBody: ProfilePutBodyInputDTO
  ) {
    try {
      return await this.collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...profilePutBody } }
      );
    } catch (error) {
      console.error(Errors.DBUpdate, error);
      throw new DatabaseError(Errors.DBUpdate);
    }
  }
}
