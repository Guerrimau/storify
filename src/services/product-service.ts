import db from "@/db";
import { NewProductDB, ProductDB, products } from "@/db/schema";
import { eq } from "drizzle-orm";

const getAllProducts = async () => {
  try {
    const productsResponse = await db.query.products.findMany();
    return productsResponse;
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

const createProduct = async (product: Partial<NewProductDB>) => {
  const productToCreate = {} as NewProductDB;
  if (product?.initialPrice! < 0) {
    throw new Error("El precio inicial no puede ser negativo");
  }

  if (product?.name?.length! < 2) {
    throw new Error("El nombre del producto debe tener al menos 3 caracteres");
  }
  productToCreate.name = product?.name!;
  productToCreate.initialPrice = product?.initialPrice!;
  productToCreate.image = product?.image || "https://via.placeholder.com/150";
  productToCreate.description = product?.description || "Sin descripción";

  try {
    // Validate User Credentials
    const insertResponse = await db
      .insert(products)
      .values(productToCreate)
      .returning();
    const createdProduct = insertResponse?.[0];

    return createdProduct;
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};

const updateProduct = async (id: number, product: Partial<NewProductDB>) => {
  if (!id) {
    throw new Error("El id es requerido");
  }

  let productToUpdate: Partial<NewProductDB> = {};

  const propertiesToUpdate = [
    "name",
    "initialPrice",
    "image",
    "description",
  ] as const;

  propertiesToUpdate.forEach((propertyName) => {
    if (product[propertyName] !== undefined) {
      productToUpdate = {
        ...productToUpdate,
        [propertyName]: product[propertyName],
      };
    }
  });

  const updateResponse = await db
    .update(products)
    .set(productToUpdate)
    .where(eq(products.id, id))
    .returning();

  const updatedProduct = updateResponse?.[0];

  return updatedProduct;
};

const removeProduct = async (id: number) => {
  if (!id) {
    throw new Error("El id es requerido");
  }

  try {
    await db.delete(products).where(eq(products.id, id)).returning();
  } catch (error) {
    throw new Error("Error al eliminar el producto");
  }
};

const productService = {
  getAll: getAllProducts,
  create: createProduct,
  update: updateProduct,
  remove: removeProduct,
};

export default productService;
