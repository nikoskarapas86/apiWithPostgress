import { Request, Response, Router } from "express";
import { UserAuthenticatedInterface } from "../interfaces/User";
import { LoginService } from "../services/LoginService";

export const LoginController: Router = Router();
const login: LoginService = new LoginService();
LoginController.get("/", async (request: Request, response: Response) => {
  try {
    const result: UserAuthenticatedInterface | null = await login.authenticate(
      request.body
    );
    return response.json(result);
  } catch (e) {
    return "unable to get user,an error has been occured";
  }
});
