import { UserDB } from "@/db/schema";

export type IGetUserByPhoneNumber = (phone: number) => Promise<UserDB>;
