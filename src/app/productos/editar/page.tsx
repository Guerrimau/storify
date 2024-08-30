"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components";
import {
  Button,
  FormLabel,
  Input,
  Sheet,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import { updateProductAction } from "./actions";
import { UpdateProductDB } from "@/db/schema";

export default function ActualizarProductoPage() {
  const [formValues, setFormValues] = useState<UpdateProductDB>({
    name: "",
    initialPrice: 0,
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    await updateProductAction(formValues.id!, formValues);
  }

  return (
    <DashboardLayout>
      <Typography level="h1">Actualizar producto</Typography>
      <Sheet
        variant="outlined"
        component={Stack}
        direction="column"
        width={350}
        p={2}
        spacing={1}
      >
        <FormLabel>Imagen</FormLabel>
        <Stack width="100%" height="150px" sx={{ border: "2px dashed white" }}>
          <InsertPhotoIcon sx={{ fontSize: "45px", margin: "auto" }} />
        </Stack>
        <FormLabel>Nombre</FormLabel>
        <Input
          name="name"
          value={formValues.name}
          onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          placeholder="Nombre del producto"
        />
        <FormLabel>Descripcion</FormLabel>
        <Textarea
          minRows={2}
          name="description"
          value={formValues.description}
          onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
          placeholder="Descripcion del producto"
        />
        <FormLabel>Precio</FormLabel>
        <Input
          startDecorator="$"
          name="initialPrice"
          type="number"
          value={formValues.initialPrice}
          onChange={(e) => setFormValues({ ...formValues, initialPrice: parseFloat(e.target.value) })}
        />
        <Button loading={loading} onClick={onSubmit}>
          Actualizar
        </Button>
      </Sheet>
    </DashboardLayout>
  );
}
