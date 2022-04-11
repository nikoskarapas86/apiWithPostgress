import supertest from "supertest";
import { UserInterface } from "../../interfaces/User";
import app from "../../server";

const request = supertest(app);
describe("user Controller", () => {
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
  it(" get a user", (done) => {
    request
      .get(`/api/users/${userId}`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);

        done();
      });
  });
  it(" get users", (done) => {
    request
      .get(`/api/users`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);

        done();
      });
  });

  it(" delete a user", (done) => {
    request
      .delete(`/api/users/${userId}`)
      .set("Authorization", "bearer " + token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);

        done();
      });
  });
});
