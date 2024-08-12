import { orderService } from "@/services";
import { INewOrder } from "@/services/interfaces/client-service-interface";
import { NextRequest, NextResponse } from "next/server";


interface IBody extends INewOrder {}

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json() as IBody;

  const createdOrder = await orderService.create(body);

  return NextResponse.json({ message: "Hello World" });
};