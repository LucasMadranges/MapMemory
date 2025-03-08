import * as bcrypt from "bcrypt";

export default class Bcrypt {
  static async hash(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }
}
