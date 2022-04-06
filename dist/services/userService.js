"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../utilities/database"));
class UserService {
    async getUsers() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM users`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get all users.`);
        }
    }
    async createUser(u) {
        try {
            const conn = await database_1.default.connect();
            const { firstName, lastName, password } = u;
            console.log(firstName, lastName, password);
            const sql = "INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
            const pepper = process.env.BCRYPT_PASSWORD;
            const salt = process.env.SALT_ROUNDS;
            console.log(pepper);
            const hashPassword = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt));
            const result = await conn.query(sql, [firstName, lastName, hashPassword]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (error) {
            throw new Error(`unable create user ${error}`);
        }
    }
    async getUserById(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM users WHERE id = $1`;
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get user by id.`);
        }
    }
    async deleteUser(id) {
        try {
            const sql = `DELETE FROM users WHERE id=$1 RETURNING *`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}.`);
        }
    }
}
exports.UserService = UserService;
