import { Request, Response, Router } from "express";
import { UserInterface } from "../interfaces/User";
import { authorizationToken } from "../middleware/authorization";
import { UserService } from "../services/userService";

export const UserController: Router = Router();
const user: UserService = new UserService();
UserController.post("/", async (request: Request, response: Response) => {
  try {
    const createdUser: UserInterface = await user.createUser(request.body);
    return response.json(createdUser);
  } catch (e) {
    return "we could not create user";
  }
});
UserController.get(
  "/",
  authorizationToken,
  async (_: Request, response: Response) => {
    try {
      const users: UserInterface[] = await user.getUsers();
      return response.json(users);
    } catch (e) {
      return "could not get the user you asked for";
    }
  }
);

UserController.delete(
  "/:id",
  authorizationToken,
  async (request: Request, response: Response) => {
    try {
      const deletedOrder: UserInterface = await user.deleteUser(
        parseInt(request.params.id)
      );
      return response.json(deletedOrder);
    } catch (e) {
      return "could not delete user";
    }
  }
);
UserController.get(
  "/:id",
  authorizationToken,
  async (request: Request, response: Response) => {
    try {
      const deletedOrder: UserInterface = await user.getUserById(
        parseInt(request.params.id)
      );
      return response.json(deletedOrder);
    } catch (e) {
      return "could not get  user ";
    }
  }
);
