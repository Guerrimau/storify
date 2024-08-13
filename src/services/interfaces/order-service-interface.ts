import { NewOrderItemDB, OrderDB } from "@/db/schema";

interface IOrderItem
  extends Pick<NewOrderItemDB, "productId" | "units" | "unitType"> {}

export interface INewOrder {
  userPhone: number;
  orderItems: IOrderItem[];
}

export type ICreateOrder = (newOrder: INewOrder) => Promise<OrderDB>;
