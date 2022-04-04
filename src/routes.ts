import { Application, Router } from "express";
import { LoginController } from "./controlers/LoginController";
import { UserController } from "./controlers/userController";

const _routes: [string, Router][] = [
  ["/users", UserController],
  ["/login", LoginController],
];

export const routes: Function = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
