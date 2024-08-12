import { NewOrderDB, OrderDB } from "@/db/schema";

export interface INewOrder extends NewOrderDB {
  userPhone: number;
  paid: boolean;
  address: string;
  totalPrice: number;
  orderItems: {
    productId: number;
    units: number;
    pricePerUnit: number;
    unitType: string;
  }[];
}

export type ICreate = (newOrder: INewOrder) => Promise<OrderDB>;
