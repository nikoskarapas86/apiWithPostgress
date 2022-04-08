"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var client = new pg_1.Pool({
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});
exports["default"] = client;
