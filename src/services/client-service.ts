import db from "@/db";
import { clients } from "@/db/schema";

type UserDB = typeof clients.$inferSelect;

type IGetByPhoneNumber = (phone: number) => Promise<UserDB>;

const getByPhoneNumber: IGetByPhoneNumber = async (number: number) => {
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