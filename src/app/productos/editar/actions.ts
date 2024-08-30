"use server";

import { UpdateProductDB } from "@/db/schema";
import { productService } from "@/services";
import { redirect } from "next/navigation";

export const updateProductAction = async (id: number, product: UpdateProductDB) => {
  try {
    await productService.update(id, product);
  } catch (error) { }
  redirect("/productos");
};
