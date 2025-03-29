import * as bcrypt from 'bcryptjs';

export class Bcrypt {
  static async hash(password: string): Promise<string> {
    return bcrypt.hashSync(password, 12);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}
