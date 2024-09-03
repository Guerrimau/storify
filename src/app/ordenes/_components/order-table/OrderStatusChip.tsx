import { Chip, ColorPaletteProp } from "@mui/joy";
import { OrderStatus } from "@/types/enums";
import { convertSnakeCaseToReadable } from "@/utils/convet-snake-case-to-readable";

export const OrderStatusChip = ({ children }: { children: OrderStatus }) => {
  const statusColors: {
    [key in OrderStatus]: ColorPaletteProp;
  } = {
    NUEVO: "danger",
    CONFIRMADO: "success",
    RECHAZADO: "neutral",
    PROGRESO: "primary",
    ENTREGADO: "neutral",
    CANCELADO: "neutral",
  };

  return (
    <Chip variant="outlined" size="sm" color={statusColors[children]}>
      {convertSnakeCaseToReadable(children)}
    </Chip>
  );
};
