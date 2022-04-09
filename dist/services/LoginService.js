"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const createToken_1 = require("../utilities/createToken");
const database_1 = __importDefault(require("../utilities/database"));
class LoginService {
    async authenticate(user) {
        const { firstName, password } = user;
        const conn = await database_1.default.connect();
        const sql = "SELECT id,password FROM users WHERE firstName=($1)";
        const result = await conn.query(sql, [firstName]);
        const pepper = process.env.BCRYPT_PASSWORD;
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                const id = user.id;
                const token = (0, createToken_1.createToken)(id);
                return {
                    auth: true,
                    token,
                };
            }
        }
        return null;
    }
}
exports.LoginService = LoginService;
