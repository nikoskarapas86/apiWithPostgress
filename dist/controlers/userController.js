"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const authorization_1 = require("../middleware/authorization");
const userService_1 = require("../services/userService");
exports.UserController = (0, express_1.Router)();
const user = new userService_1.UserService();
exports.UserController.post("/", async (request, response) => {
    const createdUser = await user.createUser(request.body);
    return response.json(createdUser);
});
exports.UserController.get("/", authorization_1.authorizationToken, async (_, response) => {
    const users = await user.getUsers();
    return response.json(users);
});
exports.UserController.delete("/:id", authorization_1.authorizationToken, async (request, response) => {
    const deletedOrder = await user.deleteUser(parseInt(request.params.id));
    return response.json(deletedOrder);
});
