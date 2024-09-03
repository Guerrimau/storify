import { ClientDB, OrderDB } from "@/db/schema";

export type OrderDto = OrderDB & { client: Partial<ClientDB> };
