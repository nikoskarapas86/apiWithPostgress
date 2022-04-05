import bcrypt from "bcrypt";
import { PoolClient, QueryResult } from "pg";
import { UserInterface, UserReturnInterface } from "../interfaces/User";
import client from "../utilities/database";

export class UserService {
  async getUsers(): Promise<any[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = `SELECT * FROM users`;
      const result: QueryResult = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users.`);
    }
  }

  async createUser(u: UserInterface): Promise<any> {
    try {
      const conn = await client.connect();
      const { firstName, lastName, password } = u;
      console.log(firstName, lastName, password);
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const salt: string = process.env.SALT_ROUNDS as string;
      console.log(pepper);
      const hashPassword: string = bcrypt.hashSync(
        u.password + pepper,
        parseInt(salt)
      );
      const result = await conn.query(sql, [firstName, lastName, hashPassword]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (error) {
      throw new Error(`unable create user ${error}`);
    }
  }
  async getUserById(userId: number): Promise<UserReturnInterface> {
    try {
      const conn: PoolClient = await client.connect();
      const sql: string = `SELECT * FROM users WHERE id = $1`;
      const result: QueryResult = await conn.query(sql, [userId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user by id.`);
    }
  }

  async deleteUser(id: number): Promise<UserReturnInterface> {
    try {
      const sql: string = `DELETE FROM users WHERE id=$1 RETURNING *`;
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}.`);
    }
  }
}
