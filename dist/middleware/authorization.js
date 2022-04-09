"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizationToken = (request, respose, next) => {
    try {
        const bearerHead = request.headers.authorization;
        const token = bearerHead ? bearerHead.split(" ")[1] : "";
        const decodedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        respose.locals.userData = decodedUser;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authorizationToken = authorizationToken;
