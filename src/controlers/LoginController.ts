import { Request, Response, Router } from "express";
import { LoginService } from "../services/LoginService";

export const LoginController: Router = Router();
const login: LoginService = new LoginService();
LoginController.get("/", async (request: Request, response: Response) => {
  const result: any = await login.authenticate(request.body);
  return response.json(result);
});
