import db from "@/db";
import { products } from "@/db/schema";

type NewProduct = typeof products.$inferInsert;

const getAll = async () => {
  try {
    const productsResponse = await db.query.products.findMany();
    return productsResponse;
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

const create = async (product: NewProduct) => {
  try {
    // Validate User Credentials
    const productResponse = await db
      .insert(products)
      .values(product)
      .returning();

    return productResponse[0];
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};

const productService = {
  getAll,
  create,
};

export default productService;
