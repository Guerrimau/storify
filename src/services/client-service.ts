import db from "@/db";
import { IGetUserByPhoneNumber } from "./interfaces/client-service-interface";

const getByPhoneNumber: IGetUserByPhoneNumber = async (number) => {
  try {
    const userResponse = await db.query.clients.findFirst({
      where: (table, funcs) => funcs.eq(table.phone, number.toString()),
    });

    if (!userResponse) {
      throw new Error("Cliente no encontrado");
    }

    return userResponse;
  } catch (error) {
    throw new Error("Error al obtener el Cliente");
  }
};

const clientService = {
  getByPhoneNumber,
};

export default clientService;
