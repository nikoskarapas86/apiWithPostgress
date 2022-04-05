import { Request, Response, Router } from "express";
import { OrderInterface } from "../interfaces/orders";
import { authorizationToken } from "../middleware/authorization";
import { OrderService } from "../services/OrderService";

export const OrderController: Router = Router();
const orderService: OrderService = new OrderService();

OrderController.get(
  "/:id",
  authorizationToken,
  async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const incomeOrder: OrderInterface[] = await orderService.getOrders(id);
    return res.json(incomeOrder);
  }
);

OrderController.post(
  "/",
  authorizationToken,
  async (req: Request, res: Response) => {
    const createdOrder: OrderInterface = await orderService.createOrder(
      req.body
    );
    return res.json(createdOrder);
  }
);

OrderController.delete(
  "/:id",
  authorizationToken,
  async (req: Request, res: Response) => {
    const deleted: OrderInterface = await orderService.deleteOrder(
      parseInt(req.params.id)
    );
    return res.json(deleted);
  }
);
