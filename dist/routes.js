"use strict";
exports.__esModule = true;
exports.routes = void 0;
var LoginController_1 = require("./controlers/LoginController");
var OrderController_1 = require("./controlers/OrderController");
var ProductsController_1 = require("./controlers/ProductsController");
var userController_1 = require("./controlers/userController");
var routesArray = [
    ["/users", userController_1.UserController],
    ["/login", LoginController_1.LoginController],
    ["/products", ProductsController_1.ProductController],
    ["/orders", OrderController_1.OrderController],
];
var routes = function (app) {
    routesArray.forEach(function (route) {
        var url = route[0], controller = route[1];
        app.use("/api".concat(url), controller);
    });
};
exports.routes = routes;
