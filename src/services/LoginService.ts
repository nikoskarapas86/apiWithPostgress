import bcrypt from "bcrypt";
import { UserAuthenticatedInterface, UserInterface } from "../interfaces/User";
import { createToken } from "../utilities/createToken";
import client from "../utilities/database";

export class LoginService {
  async authenticate(
    user: UserInterface
  ): Promise<UserAuthenticatedInterface | null> {
    const { firstName, password } = user;
    const conn = await client.connect();
    const sql = "SELECT id,password FROM users WHERE firstName=($1)";

    const result = await conn.query(sql, [firstName]);
    const pepper: string = process.env.BCRYPT_PASSWORD as string;

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password)) {
        const id: number = user.id;
        const token: string = createToken(id);
        return {
          auth: true,
          token,
        };
      }
    }

    return null;
  }
}
