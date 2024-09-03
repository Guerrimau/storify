"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Box,
  Button,
  Table,
  Sheet,
  FormControl,
  FormLabel,
  Input,
  Select,
  Option,
  Textarea,
  Autocomplete,
  IconButton,
  Avatar,
  Stack,
} from "@mui/joy";
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { UnitTypes, UnitTypesValues } from "@/types/enums";
import { convertSnakeCaseToReadable } from "@/utils/convet-snake-case-to-readable";
import { ProductDB } from "@/db/schema";

// Mock data for products
const allProducts = [
  { id: 1, name: "Apple", image: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Banana", image: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Carrot", image: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "Potato", image: "/placeholder.svg?height=50&width=50" },
];

interface Product {
  [key: string]: number | string;
  id: number;
  name: string;
  image: string;
  amount: number;
  unit: string;
  price: number;
}

interface OrderModalProps {
  open: boolean;
  viewMode: boolean;
  availableProducts: ProductDB[];
  onClose: () => void;
}

export const OrderDetailsModal = ({
  availableProducts,
  viewMode = false,
  open,
  onClose,
}: OrderModalProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const onProductChange = (index: number, field: keyof Product, value: any) => {
    const updatedProducts = products.map((product, i) => {
      if (index !== i) return product;
      return { ...product, [field]: value };
    });
    // setProducts(updatedProducts);
  };

  const onRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    // setProducts(updatedProducts);
  };

  const onAddProduct = (product: any) => {
    if (product) {
      // setProducts([
      //   ...products,
      //   { ...product, amount: 1, unit: "KG", price: 0 },
      // ]);
    }
  };

  const unitTypesOptions = UnitTypesValues.map((unit) => ({
    label: convertSnakeCaseToReadable(unit),
    value: unit,
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog sx={{ maxWidth: 800, width: "100%" }}>
        <ModalClose />
        <Typography level="h4">Detalles de Orden</Typography>

        <Box sx={{ mt: 2 }}>
          <Typography level="body-md">Cliente: John Doe</Typography>
          <Typography level="body-md">
            Fecha de Orden: {new Date().toLocaleDateString()}
          </Typography>
          <Typography level="body-md">
            Direccion: Siracusa 15. Col. Villa Bonita
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography level="body-md">Nota del cliente:</Typography>
          <Sheet variant="outlined" sx={{ mt: 1, p: 2, borderRadius: "sm" }}>
            <Typography>
              Me gustaria que el pedido llegara antes de las 2pm
            </Typography>
          </Sheet>
        </Box>

        <Sheet sx={{ mt: 4, height: 400, overflow: "auto" }}>
          <Table>
            <thead>
              <tr>
                <th style={{ width: 300 }}>Producto</th>
                <th>Cantidad</th>
                <th>Unidad</th>
                <th>Precio</th>
                <th style={{ width: 50 }}></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        size="lg"
                        variant="soft"
                        src={product.image}
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "lg",
                          my: "5px",
                        }}
                      />
                      <Typography>{product.name}</Typography>
                    </Stack>
                  </td>
                  <td>
                    {viewMode ? (
                      <Typography level="body-md">{product.amount}</Typography>
                    ) : (
                      <Input
                        type="number"
                        value={product.amount}
                        onChange={(e) =>
                          onProductChange(
                            index,
                            "amount",
                            Number(e.target.value)
                          )
                        }
                        sx={{ width: 100 }}
                      />
                    )}
                  </td>
                  <td>
                    {viewMode ? (
                      <Typography level="body-md">
                        {convertSnakeCaseToReadable(product.unit)}
                      </Typography>
                    ) : (
                      <Select
                        value={product.unit}
                        onChange={(_, value) =>
                          onProductChange(index, "unit", value)
                        }
                        sx={{
                          width: 100,
                        }}
                      >
                        {unitTypesOptions.map((unit) => (
                          <Option key={unit.value} value={unit.value}>
                            {unit.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </td>
                  <td>
                    {viewMode ? (
                      <Typography level="body-md">$ {product.price}</Typography>
                    ) : (
                      <Input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          onProductChange(
                            index,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        startDecorator="$"
                        sx={{ width: 100 }}
                      />
                    )}
                  </td>
                  <td style={{ width: 60 }}>
                    {!viewMode && (
                      <IconButton onClick={() => onRemoveProduct(index)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>

        {!viewMode && (
          <Box sx={{ mt: 2 }}>
            <FormControl>
              <FormLabel>Agregar Producto</FormLabel>
              <Autocomplete
                options={availableProducts}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    {...props}
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      cursor: "pointer",
                      paddingLeft: 2,
                    }}
                  >
                    <Avatar
                      size="lg"
                      variant="soft"
                      src={""}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "lg",
                        my: "5px",
                      }}
                    />
                    <Typography level="body-sm">{option.name}</Typography>
                  </Box>
                )}
                onChange={(_, value) => onAddProduct(value)}
                startDecorator={<SearchIcon />}
              />
            </FormControl>
          </Box>
        )}

        <Stack
          sx={{ mt: 2 }}
          direction={"row"}
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography level="h4">Total:</Typography>
          <Typography level="title-md" color="success">
            $5.5
          </Typography>
        </Stack>

        {!viewMode && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="soft"
              color="success"
              fullWidth
              startDecorator={<AttachMoneyIcon />}
            >
              Marcar como Pagado
            </Button>
          </Box>
        )}

        <Box
          sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cerrar
          </Button>
          <Button onClick={onClose}>Guardar</Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
};
