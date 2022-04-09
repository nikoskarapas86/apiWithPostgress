"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const client = new pg_1.Pool({
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    database: process.env.ENVI === "test"
        ? process.env.DATABASE_TEST
        : process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
});
exports.default = client;
