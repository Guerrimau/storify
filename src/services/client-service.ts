import db from "@/db";
import { IGetClientByPhoneNumber } from "@/types/services/client-service-interface";
import { ClientDB, clients } from "@/db/schema";

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

const getAllClients = async (): Promise<ClientDB[]> => {
  try {
    const clients = await db.query.clients.findMany();
    return clients;
  } catch (error) {
    throw new Error("Error al obtener los clientes");
  }
};

const createClient = async (
  clientData: Omit<ClientDB, "id">
): Promise<ClientDB> => {
  try {
    const [createdClient] = await db
      .insert(clients)
      .values(clientData)
      .returning();
    return createdClient;
  } catch (error) {
    console.error("Error creating client:", error);
    throw new Error("Error al crear el cliente");
  }
};

const clientService = {
  getByPhoneNumber: getClientByPhoneNumber,
  getAll: getAllClients,
  create: createClient,
};

export default clientService;
