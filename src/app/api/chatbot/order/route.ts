import { NextRequest, NextResponse } from "next/server";
import { orderService } from "@/services";
import { INewOrder } from "@/services/interfaces/order-service-interface";

interface IPostBody extends INewOrder {}

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = (await req.json()) as IPostBody;
    const createdOrder = await orderService.create(body);
    return NextResponse.json({
      message: "Pedido creado correctamente",
      success: true,
      data: createdOrder,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error al crear el pedido",
      success: false,
      data: {},
    });
  }
};
