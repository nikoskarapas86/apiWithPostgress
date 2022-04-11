import bcrypt from "bcrypt";
import { PoolClient, QueryResult } from "pg";
import { UserInterface } from "../interfaces/User";
import client from "../utilities/database";

export class UserService {
  table = "users";
  async getUsers(): Promise<UserInterface[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = `SELECT * FROM ${this.table}`;
      const result: QueryResult = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all users.`);
    }
  }

  async createUser(u: UserInterface): Promise<UserInterface> {
    try {
      const conn = await client.connect();
      const { firstName, lastName, password } = u;
      console.log(firstName, lastName, password);
      const sql = `INSERT INTO ${this.table} (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`;
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
  async getUserById(userId: number): Promise<UserInterface> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
      const result: QueryResult = await conn.query(sql, [userId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user by id.`);
    }
  }

  async deleteUser(id: number): Promise<UserInterface> {
    try {
      const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}.`);
    }
  }
}
