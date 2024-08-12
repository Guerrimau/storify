import db from "@/db";
import { orders, orderItems, NewOrderDB, OrderDB, NewOrderItemDB } from "@/db/schema";
import { clientService } from "@/services";
import { ICreate } from "./interfaces/client-service-interface";


const create: ICreate = async (newOrder) => {
  try {
    if (!newOrder.userPhone) {
      throw new Error("El número de teléfono es requerido");
    }
    const client = await clientService.getByPhoneNumber(newOrder.userPhone);

    const orderBody: NewOrderDB = {
      status: "PENDING",
      paid: newOrder.paid,
      deliveryDate: newOrder.deliveryDate,
      clientId: client.id,
      totalPrice: newOrder.totalPrice,
      address: newOrder.address,
    };

    const [orderResponse] = await db
      .insert(orders)
      .values(orderBody)
      .returning();

    const orderItemsBody = newOrder.orderItems.map((item) => ({
      orderId: orderResponse.id,
      productId: item.productId,
      units: item.units,
      pricePerUnit: 0,
      totalPrice: item.units * item.pricePerUnit,
      unitType: item.unitType,
    })) as NewOrderItemDB[];

    const orderItemsResponse = await db
      .insert(orderItems)
      .values(orderItemsBody)
      .returning();

    const response = {
      ...orderResponse,
      items: orderItemsResponse,
    };

    return response;
  } catch (error) {
    throw new Error("Error al crear la orden");
  }
};

const ordersService = {
  create,
};

export default ordersService;
