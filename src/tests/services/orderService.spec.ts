import { OrderInterface } from "../../interfaces/orders";
import { OrderService } from "../../services/OrderService";

const orderService: OrderService = new OrderService();

describe("ProductService methods in test", () => {
  const order: OrderInterface = {
    userid: 17,
    status: "ACTIVE",
    products: [
      {
        product_id: 1,
        quantity: 20,
      },
    ],
  };

  it("should have an createOrder method", () => {
    expect(orderService.createOrder).toBeDefined();
  });
  it("should have an getOrderById method", () => {
    expect(orderService.getOrderById).toBeDefined();
  });
  it("should have an deleteOrder method", () => {
    expect(orderService.deleteOrder).toBeDefined();
  });

  const createOrder = async (order: OrderInterface) => {
    return orderService.createOrder(order);
  };

  const deleteOrder = async (id: number) => {
    return orderService.deleteOrder(id);
  };
  it("createProduct method should create an order", async () => {
    const newOrder: OrderInterface = await createOrder(order);

    if (newOrder) {
      expect(newOrder).toBeTruthy();
    }

    newOrder.id && (await deleteOrder(newOrder.id));
  });
});
