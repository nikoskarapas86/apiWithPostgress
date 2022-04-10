"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const express_1 = require("express");
const authorization_1 = require("../middleware/authorization");
const OrderService_1 = require("../services/OrderService");
exports.OrderController = (0, express_1.Router)();
const orderService = new OrderService_1.OrderService();
exports.OrderController.post("/", authorization_1.authorizationToken, async (req, res) => {
    try {
        const createdOrder = await orderService.createOrder(req.body);
        return res.json(createdOrder);
    }
    catch (e) {
        return "an error has been occured ,we could not create an order";
    }
});
exports.OrderController.delete("/:id", authorization_1.authorizationToken, async (req, res) => {
    try {
        const deleted = await orderService.deleteOrder(parseInt(req.params.id));
        return res.json(deleted);
    }
    catch (e) {
        return " could not delete the order";
    }
});
