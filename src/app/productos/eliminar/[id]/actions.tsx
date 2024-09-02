"use server";

import { productService } from "@/services";
import { redirect } from "next/navigation";

export const removeProductAction = async (id: number) => {
  try {
    await productService.remove(id);
  } catch (error) { }
  redirect("/productos");
};

