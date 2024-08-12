import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/services";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const products = await productService.getAll();
    return NextResponse.json({
      message: "Productos obtenidos correctamente",
      success: true,
      data: products,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Error al obtener los productos",
      success: false,
      data: [],
    });
  }
};
