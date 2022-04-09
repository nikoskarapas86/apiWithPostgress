import { ProductInterface } from "../../interfaces/products";
import { ProductService } from "../../services/ProductService";

const prodService: ProductService = new ProductService();
describe("ProductService methods in test", () => {
  const product: ProductInterface = {
    name: "book",
    price: 40,
  };

  it("should have an getProducts method", () => {
    expect(prodService.getProducts).toBeDefined();
  });
  it("should have an createProduct method", () => {
    expect(prodService.createProduct).toBeDefined();
  });
  it("should have an getProductById method", () => {
    expect(prodService.getProductById).toBeDefined();
  });
  it("should have an deleteProduct method", () => {
    expect(prodService.deleteProduct).toBeDefined();
  });

  const createProduct = async (product: ProductInterface) => {
    return prodService.createProduct(product);
  };

  const deleteProduct = async (id: number) => {
    return prodService.deleteProduct(id);
  };
  it("createProduct method should create a product", async () => {
    const newProduct: ProductInterface = await createProduct(product);

    if (newProduct) {
      expect(product.name).toBe(newProduct.name);
      expect(product.price).toBe(newProduct.price);
    }

    newProduct.id && (await deleteProduct(newProduct.id));
  });
  it("getProducts method should return a list of products", async () => {
    const newProduct: ProductInterface = await createProduct(product);
    const listOfProducts = await prodService.getProducts();

    expect(listOfProducts).toEqual([newProduct]);

    newProduct.id && (await deleteProduct(newProduct.id));
  });
  it("getProductById method should return the correct product", async () => {
    const newProduct: ProductInterface = await createProduct(product);
    const storedProduct =
      newProduct.id && (await prodService.getProductById(newProduct.id));
    if (storedProduct) {
      expect(storedProduct.name).toBe(newProduct.name);
      expect(storedProduct.price).toBe(newProduct.price);
    }

    newProduct.id && (await deleteProduct(newProduct.id));
  });
});
