export enum OrderStatus {
  Pendiente = "PENDIENTE",
  Confirmado = "CONFIRMADO",
  Rechazado = "RECHAZADO",
  EnProgreso = "EN_PROGRESO",
  Entregado = "ENTREGADO",
  Cancelado = "CANCELADO",
}

export const OrderStatusValues: OrderStatus[] = [
  OrderStatus.Pendiente,
  OrderStatus.Confirmado,
  OrderStatus.Rechazado,
  OrderStatus.EnProgreso,
  OrderStatus.Entregado,
  OrderStatus.Cancelado,
];

export enum UnitTypes {
  Kg = "KG",
  Pieza = "PIEZA",
  Caja = "CAJA",
  Bolsa = "BOLSA",
}

export const UnitTypesValues: UnitTypes[] = [
  UnitTypes.Kg,
  UnitTypes.Pieza,
  UnitTypes.Caja,
  UnitTypes.Bolsa,
];
