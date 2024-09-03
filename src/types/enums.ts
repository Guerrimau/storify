export enum OrderStatus {
  Nuevo = "NUEVO",
  Confirmado = "CONFIRMADO",
  Rechazado = "RECHAZADO",
  Progreso = "PROGRESO",
  Entregado = "ENTREGADO",
  Cancelado = "CANCELADO",
}

export const OrderStatusValues: OrderStatus[] = [
  OrderStatus.Nuevo,
  OrderStatus.Confirmado,
  OrderStatus.Rechazado,
  OrderStatus.Progreso,
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
