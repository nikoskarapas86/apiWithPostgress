"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const database_1 = __importDefault(require("../utilities/database"));
class ProductService {
    async getProducts() {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM products`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get all Products.`);
        }
    }
    async createProduct(product) {
        try {
            const conn = await database_1.default.connect();
            const { name, price, category } = product;
            console.log(name, price, category);
            const sql = "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
            const result = await conn.query(sql, [name, price, category]);
            const createdProduct = result.rows[0];
            conn.release();
            return createdProduct;
        }
        catch (error) {
            throw new Error(`unable create product ${error}`);
        }
    }
    async getProductById(prodId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM products WHERE id = $1`;
            const result = await conn.query(sql, [prodId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get product with id = ${prodId}.`);
        }
    }
    async deleteProduct(prodId) {
        try {
            const sql = `DELETE FROM products WHERE id=$1 RETURNING *`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [prodId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete product ${prodId}.`);
        }
    }
}
exports.ProductService = ProductService;
