"use server";

import { NewProductDB } from "@/db/schema";
import { productService } from "@/services";
import { redirect } from "next/navigation";

export const createProductAction = async (product: NewProductDB) => {
  try {
    await productService.create(product);
  } catch (error) {}
  redirect("/productos");
};
