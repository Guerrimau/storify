import db from "@/db";
import { IGetClientByPhoneNumber } from "@/types/services/client-service-interface";

const getClientByPhoneNumber: IGetClientByPhoneNumber = async (number) => {
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
  getByPhoneNumber: getClientByPhoneNumber,
};

export default clientService;
