"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const database_1 = __importDefault(require("../utilities/database"));
class OrderService {
    async getOrderById(id) {
        try {
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const conn = await database_1.default.connect();
            const { rows } = await conn.query(sql, [id]);
            const selectedOrder = rows[0];
            const orderPSql = "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
            const { rows: orderProdrows } = await conn.query(orderPSql, [id]);
            conn.release();
            return {
                ...selectedOrder,
                products: orderProdrows,
            };
        }
        catch (err) {
            throw new Error(`Could not get order`);
        }
    }
    async createOrder(order) {
        const { products, status, userid } = order;
        try {
            const conn = await database_1.default.connect();
            const sql = "INSERT INTO orders (userid, status) VALUES($1, $2) RETURNING *";
            const result = await conn.query(sql, [userid, status]);
            const order = result.rows[0];
            const orderProductsSql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity";
            const orderProducts = [];
            for (const product of products) {
                const { product_id, quantity } = product;
                const { rows } = await conn.query(orderProductsSql, [
                    order.id,
                    product_id,
                    quantity,
                ]);
                orderProducts.push(rows[0]);
            }
            conn.release();
            return {
                ...order,
                products: orderProducts,
            };
        }
        catch (err) {
            throw new Error(`Could not create order.`);
        }
    }
    async deleteOrder(id) {
        try {
            const conn = await database_1.default.connect();
            const orderProductsSql = "DELETE FROM order_products WHERE order_id=($1)";
            await conn.query(orderProductsSql, [id]);
            const sql = "DELETE FROM orders WHERE id=($1)";
            const { rows } = await conn.query(sql, [id]);
            const deletedOrder = rows[0];
            conn.release();
            return deletedOrder;
        }
        catch (err) {
            throw new Error(`Could not delete order`);
        }
    }
}
exports.OrderService = OrderService;
