import { PoolClient, QueryResult } from "pg";
import { ProductInterface } from "../interfaces/products";
import client from "../utilities/database";

export class ProductService {
  async getProducts(): Promise<ProductInterface[]> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = `SELECT * FROM products`;
      const result: QueryResult = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get all Products.`);
    }
  }

  async createProduct(product: ProductInterface): Promise<ProductInterface> {
    try {
      const conn = await client.connect();
      const { name, price, category } = product;
      console.log(name, price, category);
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";

      const result = await conn.query(sql, [name, price, category]);
      const createdProduct = result.rows[0];

      conn.release();

      return createdProduct;
    } catch (error) {
      throw new Error(`unable create product ${error}`);
    }
  }

  async getProductById(prodId: number): Promise<ProductInterface> {
    try {
      const conn: PoolClient = await client.connect();
      const sql = `SELECT * FROM products WHERE id = $1`;
      const result: QueryResult = await conn.query(sql, [prodId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product with id = ${prodId}.`);
    }
  }

  async deleteProduct(prodId: number): Promise<ProductInterface> {
    try {
      const sql = `DELETE FROM products WHERE id=$1 RETURNING *`;
      const conn: PoolClient = await client.connect();
      const result: QueryResult = await conn.query(sql, [prodId]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${prodId}.`);
    }
  }
}
