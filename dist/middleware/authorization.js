"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authorizationToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authorizationToken = function (request, respose, next) {
    try {
        var bearerHead = request.headers.authorization;
        var token = bearerHead ? bearerHead.split(" ")[1] : "";
        var decodedUser = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
        respose.locals.userData = decodedUser;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authorizationToken = authorizationToken;
