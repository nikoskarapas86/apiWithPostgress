"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const express_1 = require("express");
const authorization_1 = require("../middleware/authorization");
const ProductService_1 = require("../services/ProductService");
exports.ProductController = (0, express_1.Router)();
const product = new ProductService_1.ProductService();
exports.ProductController.post("/", authorization_1.authorizationToken, async (request, response) => {
    const createdProduct = await product.createProduct(request.body);
    return response.json(createdProduct);
});
exports.ProductController.get("/", authorization_1.authorizationToken, async (_, response) => {
    const products = await product.getProducts();
    return response.json(products);
});
exports.ProductController.delete("/:id", authorization_1.authorizationToken, async (request, response) => {
    const deletedProduct = await product.deleteProduct(parseInt(request.params.id));
    return response.json(deletedProduct);
});
exports.ProductController.get("/:id", authorization_1.authorizationToken, async (request, response) => {
    const deletedProduct = await product.getProductById(parseInt(request.params.id));
    return response.json(deletedProduct);
});
