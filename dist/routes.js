"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const LoginController_1 = require("./controlers/LoginController");
const OrderController_1 = require("./controlers/OrderController");
const ProductsController_1 = require("./controlers/ProductsController");
const userController_1 = require("./controlers/userController");
const routesArray = [
    ["/users", userController_1.UserController],
    ["/login", LoginController_1.LoginController],
    ["/products", ProductsController_1.ProductController],
    ["/orders", OrderController_1.OrderController],
];
const routes = (app) => {
    routesArray.forEach((route) => {
        const [url, controller] = route;
        app.use(`/api${url}`, controller);
    });
};
exports.routes = routes;
