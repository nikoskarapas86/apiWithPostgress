import { Application, Router } from "express";
import { LoginController } from "./controlers/LoginController";
import { OrderController } from "./controlers/OrderController";
import { ProductController } from "./controlers/ProductsController";
import { UserController } from "./controlers/userController";

const _routes: [string, Router][] = [
  ["/users", UserController],
  ["/login", LoginController],
  ["/products", ProductController],
  ["/orders", OrderController],
];

export const routes: Function = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
