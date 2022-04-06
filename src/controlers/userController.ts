import { Request, Response, Router } from "express";
import { UserInterface } from "../interfaces/User";
import { authorizationToken } from "../middleware/authorization";
import { UserService } from "../services/userService";

export const UserController: Router = Router();
const user: UserService = new UserService();
UserController.post("/", async (request: Request, response: Response) => {
  const createdUser: UserInterface = await user.createUser(request.body);
  return response.json(createdUser);
});
UserController.get(
  "/",
  authorizationToken,
  async (_: Request, response: Response) => {
    const users: UserInterface[] = await user.getUsers();
    return response.json(users);
  }
);

UserController.delete(
  "/:id",
  authorizationToken,
  async (request: Request, response: Response) => {
    const deletedOrder: UserInterface = await user.deleteUser(
      parseInt(request.params.id)
    );
    return response.json(deletedOrder);
  }
);
