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
import { UnitTypes, UnitTypesValues } from "@/types/enums";
import { convertSnakeCaseToReadable } from "@/utils/convet-snake-case-to-readable";

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
  onClose: () => void;
}

export default function OrderDetailsModal({ open, onClose }: OrderModalProps) {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Apple",
      image: "/placeholder.svg?height=50&width=50",
      amount: 1,
      unit: "KG",
      price: 2.5,
    },
    {
      id: 2,
      name: "Banana",
      image: "/placeholder.svg?height=50&width=50",
      amount: 2,
      unit: "PIEZA",
      price: 1.5,
    },
  ]);

  const onProductChange = (index: number, field: keyof Product, value: any) => {
    const updatedProducts = products.map((product, i) => {
      if (index !== i) return product;
      return { ...product, [field]: value };
    });
    setProducts(updatedProducts);
  };

  const onRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const onAddProduct = (product: any) => {
    if (product) {
      setProducts([
        ...products,
        { ...product, amount: 1, unit: "KG", price: 0 },
      ]);
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
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography level="body-md">Nota del cliente:</Typography>
          <Textarea
            placeholder="Detalles adicionales"
            minRows={2}
            sx={{ mt: 1 }}
          />
        </Box>

        <Sheet sx={{ mt: 4, height: 400, overflow: "auto" }}>
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Unidad</th>
                <th>Precio</th>
                <th style={{ width: 60 }}></th>
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
                    <Input
                      type="number"
                      value={product.amount}
                      onChange={(e) =>
                        onProductChange(index, "amount", Number(e.target.value))
                      }
                      sx={{ width: 80 }}
                    />
                  </td>
                  <td>
                    <Select
                      value={product.unit}
                      onChange={(_, value) =>
                        onProductChange(index, "unit", value)
                      }
                      sx={{ width: 100 }}
                    >
                      {unitTypesOptions.map((unit) => (
                        <Option key={unit.value} value={unit.value}>
                          {unit.label}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        onProductChange(index, "price", Number(e.target.value))
                      }
                      startDecorator="$"
                      sx={{ width: 100 }}
                    />
                  </td>
                  <td style={{ width: 60 }}>
                    <IconButton onClick={() => onRemoveProduct(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>

        <Box sx={{ mt: 2 }}>
          <FormControl>
            <FormLabel>Agregar Producto</FormLabel>
            <Autocomplete
              options={allProducts}
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

        <Box
          sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button variant="outlined" color="neutral" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onClose}>Confirmar</Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
}
