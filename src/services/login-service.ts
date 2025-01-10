import { MongoClient } from "mongodb";
import { User, UserCredentials } from "../types/models/user-types";

export class LoginService {
  private collection;

  constructor(client: MongoClient, dbName: string) {
    this.collection = client.db(dbName).collection("users");
  }

  async getUser(userData: UserCredentials) {
    return (await this.collection.findOne(userData, {
      projection: { password: 0 },
    })) as User | null;
  }
}
