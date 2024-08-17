import { ClientDB } from "@/db/schema";

export type IGetClientByPhoneNumber = (phone: number) => Promise<ClientDB>;
