import { Db } from "mongodb";
import { UserEntity } from "../types/entities/user-entity";
import { DatabaseError } from "../errors/database-error";
import { Errors } from "../constants/errors-constants";

export class UserService {
  private collection;

  constructor(mongoDb: Db) {
    this.collection = mongoDb.collection<UserEntity>("users");
  }

  async postUser(user: UserEntity) {
    try {
      return await this.collection.insertOne(user);
    } catch (error) {
      console.error(Errors.DBInsert, error);
      throw new DatabaseError(Errors.DBInsert);
    }
  }

  async getUserByLogin(login: string) {
    try {
      return await this.collection.findOne({ login });
    } catch (error) {
      console.error(Errors.DBGet, error);
      throw new DatabaseError(Errors.DBGet);
    }
  }
}
