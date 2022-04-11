"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createToken = function (id) {
    return jsonwebtoken_1["default"].sign(id.toString(), process.env.JWT_SECRET);
};
exports.createToken = createToken;
