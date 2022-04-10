import { Request, Response, Router } from "express";
import { OrderInterface } from "../interfaces/orders";
import { authorizationToken } from "../middleware/authorization";
import { OrderService } from "../services/OrderService";

export const OrderController: Router = Router();
const orderService: OrderService = new OrderService();

OrderController.post(
  "/",
  authorizationToken,
  async (req: Request, res: Response) => {
    try {
      const createdOrder: OrderInterface = await orderService.createOrder(
        req.body
      );
      return res.json(createdOrder);
    } catch (e) {
      return "an error has been occured ,we could not create an order";
    }
  }
);

OrderController.delete(
  "/:id",
  authorizationToken,
  async (req: Request, res: Response) => {
    try {
      const deleted: OrderInterface = await orderService.deleteOrder(
        parseInt(req.params.id)
      );
      return res.json(deleted);
    } catch (e) {
      return " could not delete the order";
    }
  }
);
