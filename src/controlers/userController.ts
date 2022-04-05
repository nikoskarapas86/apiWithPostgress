import { Request, Response, Router } from "express";
import { UserReturnInterface } from "../interfaces/User";
import { authorizationToken } from "../middleware/authorization";
import { UserService } from "../services/userService";

export const UserController: Router = Router();
const user: UserService = new UserService();
UserController.post("/", async (request: Request, response: Response) => {
  const createdUser: any = await user.createUser(request.body);
  return response.json(createdUser);
});
UserController.get(
  "/",
  authorizationToken,
  async (_: Request, response: Response) => {
    const users: any = await user.getUsers();
    return response.json(users);
  }
);

UserController.delete(
  "/:id",
  authorizationToken,
  async (request: Request, response: Response) => {
    const deletedOrder: UserReturnInterface = await user.deleteUser(
      parseInt(request.params.id)
    );
    return response.json(deletedOrder);
  }
);
