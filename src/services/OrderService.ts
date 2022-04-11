import { OrderInterface } from "../interfaces/orders";
import client from "../utilities/database";

export class OrderService {
  async getOrderById(id: number): Promise<OrderInterface> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const conn = await client.connect();
      const { rows } = await conn.query(sql, [id]);
      const selectedOrder = rows[0];

      const orderPSql =
        "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
      const { rows: orderProdrows } = await conn.query(orderPSql, [id]);

      conn.release();

      return {
        ...selectedOrder,
        products: orderProdrows,
      };
    } catch (err) {
      throw new Error(`Could not get order`);
    }
  }
  async getOrders(): Promise<OrderInterface[]> {
    try {
      const sql = "SELECT * FROM orders";
      const connection = await client.connect();
      const { rows } = await connection.query(sql);
      const order = rows[0];

      const orderProducts =
        "SELECT product_id, quantity FROM order_products WHERE order_id=($1)";
      const orders = [];

      for (const order of rows) {
        const { rows: orderProductRows } = await connection.query(
          orderProducts,
          [order.id]
        );
        orders.push({
          ...order,
          products: orderProductRows,
        });
      }

      connection.release();

      return orders;
    } catch (err) {
      throw new Error(`Could not get orders. ${err}`);
    }
  }
  async createOrder(order: OrderInterface): Promise<OrderInterface> {
    const { products, status, userid } = order;
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (userid, status) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [userid, status]);

      const order = result.rows[0];
      const orderProductsSql =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity";
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
    } catch (err) {
      throw new Error(`Could not create order.`);
    }
  }

  async deleteOrder(id: number): Promise<OrderInterface> {
    try {
      const conn = await client.connect();
      const orderProductsSql = "DELETE FROM order_products WHERE order_id=($1)";
      await conn.query(orderProductsSql, [id]);

      const sql = "DELETE FROM orders WHERE id=($1)";
      const { rows } = await conn.query(sql, [id]);
      const deletedOrder = rows[0];

      conn.release();
      return deletedOrder;
    } catch (err) {
      throw new Error(`Could not delete order`);
    }
  }
}
