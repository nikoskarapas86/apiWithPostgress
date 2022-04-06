"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const express_1 = require("express");
const authorization_1 = require("../middleware/authorization");
const OrderService_1 = require("../services/OrderService");
exports.OrderController = (0, express_1.Router)();
const orderService = new OrderService_1.OrderService();
exports.OrderController.get("/:id", authorization_1.authorizationToken, async (req, res) => {
    const id = parseInt(req.params.id);
    const incomeOrder = await orderService.getOrders(id);
    return res.json(incomeOrder);
});
exports.OrderController.post("/", authorization_1.authorizationToken, async (req, res) => {
    const createdOrder = await orderService.createOrder(req.body);
    return res.json(createdOrder);
});
exports.OrderController.delete("/:id", authorization_1.authorizationToken, async (req, res) => {
    const deleted = await orderService.deleteOrder(parseInt(req.params.id));
    return res.json(deleted);
});
