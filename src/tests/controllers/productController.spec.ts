import supertest from "supertest";
import { ProductInterface } from "../../interfaces/products";
import { UserInterface } from "../../interfaces/User";
import app from "../../server";

const request = supertest(app);

describe("Product Controller", () => {
  const product: ProductInterface = {
    name: "product",
    price: 9,
  };
  let token: string, userId: number, productId: number;
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
  it(" creates product", (done) => {
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
  it("get all products endpoint", (done) => {
    request.get("/api/products").then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
  it("get one product", (done) => {
    request.get(`/api/products/${productId}`).then((res) => {
      expect(res.status).toBe(200);
      done();
    });
  });
  it("deletes product", (done) => {
    request
      .delete(`/api/products/${productId}`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
  afterAll(async () => {
    await request
      .delete(`/api/users/${userId}`)
      .set("Authorization", "bearer " + token);
  });
});
