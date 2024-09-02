"use server";

import { UpdateProductDB } from "@/db/schema";
import { productService } from "@/services";
import { redirect } from "next/navigation";

export const updateProductAction = async (
  id: number,
  product: UpdateProductDB
) => {
  try {
    await productService.update(id, product);
  } catch (error) { }
  redirect("/productos");
};

export const getProductAction = async (id: number) => {
  try {
    const product = await productService.getById(id);
    return product;
  } catch (error) { }
};
