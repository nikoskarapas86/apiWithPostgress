import { OrderInterface } from "../../interfaces/orders";
import { UserInterface } from "../../interfaces/User";
import { OrderService } from "../../services/OrderService";
import { ProductService } from "../../services/ProductService";
import { UserService } from "../../services/userService";

const orderService: OrderService = new OrderService();

describe("orderService methods in test", () => {
  const order: OrderInterface = {
    userid: 0,
    status: "ACTIVE",
    products: [
      {
        product_id: 1,
        quantity: 20,
      },
    ],
  };
  beforeAll(async () => {
    const userData: UserInterface = {
      firstName: "nik",
      lastName: "karapas",
      password: "fermionio1",
    };

    const userService: UserService = new UserService();
    const prodService: ProductService = new ProductService();
    const newUser = await userService.createUser(userData);
    if (newUser.id) order.userid = newUser.id;
  });

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
  it("createOrder method should create an order", async () => {
    const newOrder: OrderInterface = await createOrder(order);

    if (newOrder) {
      expect(newOrder).toBeTruthy();
    }

    newOrder.id && (await deleteOrder(newOrder.id));
  });
});
