import { OrderInterface } from "../interfaces/orders";
import client from "../utilities/database";

export class OrderService {
  async getOrders(id: number): Promise<OrderInterface[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=$1`;
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all orders of orders.`);
    }
  }

  async createOrder(order: OrderInterface): Promise<OrderInterface> {
    try {
      const { productid, quantity, userid, status } = order;

      const conn = await client.connect();
      const sql = `INSERT INTO orders (productid, quantity, userid, status) VALUES($1, $2, $3, $4) RETURNING *`;
      const result = await conn.query(sql, [
        productid,
        quantity,
        userid,
        status,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order.`);
    }
  }

  async deleteOrder(id: number): Promise<OrderInterface> {
    try {
      const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order`);
    }
  }
}
