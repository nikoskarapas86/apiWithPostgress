import supertest from "supertest";
import { OrderInterface } from "../../interfaces/orders";
import { ProductInterface } from "../../interfaces/products";
import { UserInterface } from "../../interfaces/User";
import app from "../../server";

const request = supertest(app);
describe("user Controller", () => {
  it("senario ", async () => {
    const user: UserInterface = {
      firstName: "nik",
      lastName: "karapas",
      password: "fermiDirac",
    };

    const product: ProductInterface = {
      name: "book",
      price: 19,
    };
    const newUser = await request.post("/api/users").send(user);
    const result = await request
      .get("/api/login")
      .send({ firstName: "nik", password: "fermiDirac" });

    const token = JSON.parse(result.text).token;
    const createdProduct = await request
      .post("/api/products")
      .set("Authorization", "bearer " + token)
      .send(product);

    const { userid } = JSON.parse(newUser.text);
    const { prodid } = JSON.parse(createdProduct.text);

    const orderToCreate: OrderInterface = {
      userid: 1,
      status: "true",
      products: [
        {
          product_id: 1,
          quantity: 5,
        },
      ],
    };
    //   const createdOrder = await request
    //     .post("/api/orders")
    //     .set("Authorization", "bearer " + token)
    //     .send(orderToCreate);
  });
});
