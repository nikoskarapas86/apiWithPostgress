import supertest from "supertest";
import { OrderInterface } from "../../interfaces/orders";
import { ProductInterface } from "../../interfaces/products";
import { UserInterface } from "../../interfaces/User";
import app from "../../server";

const request = supertest(app);

describe("order Controller", () => {
  const product: ProductInterface = {
    name: "product",
    price: 9,
  };
  let token: string, orderId: number, userId: number, productId: number;

  beforeAll(async () => {
    const userData: UserInterface = {
      firstName: "nik",
      lastName: "karapas",
      password: "fermionio1",
    };
    const us = await request.post("/api/users").send(userData);
    userId = JSON.parse(us.text).id;

    const { body } = await request
      .get("/api/login")
      .send({ firstName: "nik", password: "fermionio1" });
    token = body.token;
  });
  it(" creates product for order", (done) => {
    request
      .post("/api/products")
      .send(product)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);

        productId = body.id;

        done();
      });
  });
  it(" creates order", (done) => {
    let order: OrderInterface = {
      products: [
        {
          product_id: productId,
          quantity: 5,
        },
      ],
      userid: userId,
      status: "active",
    };

    request
      .post("/api/orders")
      .send(order)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        orderId = body.id;
        done();
      });
  });

  it("get one order", (done) => {
    request
      .get(`/api/orders/${orderId}`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
  it("delete one order", (done) => {
    request
      .delete(`/api/orders/${orderId}`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
