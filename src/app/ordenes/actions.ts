import { productService } from "@/services";

export const getProductsAction = () => {
  const products = productService.getAll();
  return products;
};
