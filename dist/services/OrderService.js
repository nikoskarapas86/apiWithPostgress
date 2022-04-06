"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const database_1 = __importDefault(require("../utilities/database"));
class OrderService {
    async getOrders(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE user_id=$1`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get all orders of orders.`);
        }
    }
    async createOrder(order) {
        try {
            const { productid, quantity, userid, status } = order;
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO orders (productid, quantity, userid, status) VALUES($1, $2, $3, $4) RETURNING *`;
            const result = await conn.query(sql, [
                productid,
                quantity,
                userid,
                status,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create order.`);
        }
    }
    async deleteOrder(id) {
        try {
            const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not delete order`);
        }
    }
}
exports.OrderService = OrderService;
