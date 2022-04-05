import { Request, Response, Router } from "express";
import { OrderInterface } from "../interfaces/orders";
import { OrderService } from "../models/OrderService";

export const OrderController: Router = Router();
const orderService: OrderService = new OrderService();

OrderController.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.userid);
  const incomeOrder: OrderInterface[] = await orderService.getOrders(id);
  return res.json(incomeOrder);
});

OrderController.post("/", async (req: Request, res: Response) => {
  const createdOrder: OrderInterface = await orderService.createOrder(req.body);
  return res.json(createdOrder);
});
