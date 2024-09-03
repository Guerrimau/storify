import { OrderDto } from "@/app/ordenes/_components/order-table/types";

export const MOCK_ORDERS = [
  {
    id: 1,
    paid: true,
    status: "NUEVO",
    deliveryDate: "2022-12-31",
    client: {
      email: "jonhdoe@gmail.com",
      phone: "1234567890",
      firstName: "Jonh",
      lastName: "Doe",
    },
  },
  {
    id: 2,
    paid: false,
    status: "CONFIRMADO",
    deliveryDate: "2022-12-31",
    client: {
      email: "johndoe@gmail.com",
      phone: "0987654321",
      firstName: "Jane",
      lastName: "Doe",
    },
  },
  {
    id: 3,
    paid: true,
    status: "PROGRESO",
    deliveryDate: "2022-12-31",
    client: {
      email: "johndoe@gmail.com",
      phone: "0987654321",
      firstName: "Jane",
      lastName: "Doe",
    },
  },
  {
    id: 4,
    paid: false,
    status: "RECHAZADO",
    deliveryDate: "2022-12-31",
    client: {
      email: "johndoe@gmail.com",
      phone: "0987654321",
      firstName: "Jane",
      lastName: "Doe",
    },
  },
] as OrderDto[];
