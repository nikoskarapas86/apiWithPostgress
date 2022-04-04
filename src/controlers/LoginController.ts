import { Request, Response, Router } from "express";
import { LoginModel } from "../models/LoginModel";

export const LoginController: Router = Router();
const login: LoginModel = new LoginModel();
LoginController.get("/", async (request: Request, response: Response) => {
  const result: any = await login.authenticate(request.body);
  return response.json(result);
});
