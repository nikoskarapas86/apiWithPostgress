"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const authorization_1 = require("../middleware/authorization");
const userService_1 = require("../services/userService");
exports.UserController = (0, express_1.Router)();
const user = new userService_1.UserService();
exports.UserController.post("/", async (request, response) => {
    try {
        const createdUser = await user.createUser(request.body);
        return response.json(createdUser);
    }
    catch (e) {
        return "we could not create user";
    }
});
exports.UserController.get("/", authorization_1.authorizationToken, async (_, response) => {
    try {
        const users = await user.getUsers();
        return response.json(users);
    }
    catch (e) {
        return "could not get the user you asked for";
    }
});
exports.UserController.delete("/:id", authorization_1.authorizationToken, async (request, response) => {
    try {
        const deletedOrder = await user.deleteUser(parseInt(request.params.id));
        return response.json(deletedOrder);
    }
    catch (e) {
        return "could not delete user";
    }
});
