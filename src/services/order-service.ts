import db from "@/db";
import { orders, orderItems, NewOrderDB, NewOrderItemDB } from "@/db/schema";
import { clientService } from "@/services";
import { ICreateOrder } from "@/types/services/order-service-interface";

const createOrder: ICreateOrder = async (newOrder) => {
  if (!newOrder.userPhone) {
    throw new Error("El número de teléfono es requerido");
  }
  const client = await clientService.getByPhoneNumber(newOrder.userPhone);

  if (!client) {
    throw new Error("El cliente no existe");
  }

  try {
    const orderBody: NewOrderDB = {
      status: "PENDING",
      paid: false,
      deliveryDate: new Date().toISOString(),
      totalPrice: 0,
      clientId: client.id,
      address: client.address,
    };

    const [orderResponse] = await db
      .insert(orders)
      .values(orderBody)
      .returning();

    const orderItemsBody = newOrder.orderItems.map((item) => ({
      pricePerUnit: 0,
      totalPrice: 0,
      orderId: orderResponse.id,
      productId: item.productId,
      unitType: item.unitType,
      units: item.units,
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
    console.log(error);
    throw new Error("Error al crear la orden");
  }
};

const ordersService = {
  create: createOrder,
};

export default ordersService;
