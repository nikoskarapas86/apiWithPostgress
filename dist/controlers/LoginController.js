"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const express_1 = require("express");
const LoginService_1 = require("../services/LoginService");
exports.LoginController = (0, express_1.Router)();
const login = new LoginService_1.LoginService();
exports.LoginController.get("/", async (request, response) => {
    try {
        const result = await login.authenticate(request.body);
        return response.json(result);
    }
    catch (e) {
        return "unable to get user,an error has been occured";
    }
});
