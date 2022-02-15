import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_User";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          email,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByUser(email: string): Promise<User> {
    try {
      const [result] = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({email: email});
  
      return User.toUserModel(result);
      
    } catch (error: any) {
      throw new Error(error.slqMessage || error.message)
    }
  }

}
