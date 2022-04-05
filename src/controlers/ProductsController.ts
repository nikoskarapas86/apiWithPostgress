import { Request, Response, Router } from "express";
import { ProductInterface } from "../interfaces/products";
import { authorizationToken } from "../middleware/authorization";
import { ProductService } from "../services/ProductService";

export const ProductController: Router = Router();
const product: ProductService = new ProductService();
ProductController.post(
  "/",
  authorizationToken,
  async (request: Request, response: Response) => {
    const createdProduct: ProductInterface = await product.createProduct(
      request.body
    );
    return response.json(createdProduct);
  }
);

ProductController.get(
  "/",
  authorizationToken,
  async (_: Request, response: Response) => {
    const products: ProductInterface[] = await product.getProducts();
    return response.json(products);
  }
);
ProductController.delete(
  "/:id",
  authorizationToken,
  async (request: Request, response: Response) => {
    const deletedProduct: ProductInterface = await product.deleteProduct(
      parseInt(request.params.id)
    );
    return response.json(deletedProduct);
  }
);

ProductController.get(
  "/:id",
  authorizationToken,
  async (request: Request, response: Response) => {
    const deletedProduct: ProductInterface = await product.getProductById(
      parseInt(request.params.id)
    );
    return response.json(deletedProduct);
  }
);
