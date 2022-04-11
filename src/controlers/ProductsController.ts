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
    try {
      const createdProduct: ProductInterface = await product.createProduct(
        request.body
      );
      return response.json(createdProduct);
    } catch (e) {
      return "we could not create product";
    }
  }
);

ProductController.get("/", async (_: Request, response: Response) => {
  try {
    const products: ProductInterface[] = await product.getProducts();
    return response.json(products);
  } catch (e) {
    return "we could not get products";
  }
});
ProductController.delete(
  "/:id",
  authorizationToken,
  async (request: Request, response: Response) => {
    try {
      const deletedProduct: ProductInterface = await product.deleteProduct(
        parseInt(request.params.id)
      );
      return response.json(deletedProduct);
    } catch (e) {
      return "we could not delete product";
    }
  }
);

ProductController.get("/:id", async (request: Request, response: Response) => {
  try {
    const deletedProduct: ProductInterface = await product.getProductById(
      parseInt(request.params.id)
    );
    return response.json(deletedProduct);
  } catch (e) {
    return "we could not get the product you asked for";
  }
});
