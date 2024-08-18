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

import { createProductAction } from "./actions";
import { NewProductDB } from "@/db/schema";

export default function AgregarProductoPage() {
  const [formValues, setFormValues] = useState<NewProductDB>({
    image: "",
    name: "",
    description: "",
    initialPrice: 0,
  });
  const [loading, setLoading] = useState(false);

  const onAddClick = async () => {
    setLoading(true);
    await createProductAction(formValues);
  };

  const onFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <DashboardLayout>
      <Typography level="h1">Agregar producto</Typography>
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
        <Input name="name" value={formValues.name} onChange={onFormChange} />
        <FormLabel>Descripcion</FormLabel>
        <Textarea
          minRows={2}
          name="description"
          value={formValues.description}
          onChange={onFormChange}
        />
        <FormLabel>Precio Inicial</FormLabel>
        <Input
          startDecorator="$"
          name="initialPrice"
          value={formValues.initialPrice}
          onChange={onFormChange}
        />
        <Button loading={loading} onClick={onAddClick}>
          Agregar
        </Button>
      </Sheet>
    </DashboardLayout>
  );
}
