"use server";

import { NewClientDB } from "@/db/schema";
import { clientService } from "@/services";
import { redirect } from "next/navigation";

export const createClientAction = async (client: NewClientDB) => {
  try {
    await clientService.create(client);
  } catch (error) {}
  redirect("/clientes");
};
