import { Request, Response, Router } from "express";
import { ProductInterface } from "../interfaces/products";
import { authorizationToken } from "../middleware/authorization";
import { ProductModel } from "../models/ProductModel";

export const ProductController: Router = Router();
const product: ProductModel = new ProductModel();
ProductController.post("/", async (request: Request, response: Response) => {
  const createdProduct: ProductInterface = await product.createProduct(
    request.body
  );
  return response.json(createdProduct);
});

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
