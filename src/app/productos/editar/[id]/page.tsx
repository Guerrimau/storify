"use client";

import React, { useEffect, useState } from "react";
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

import { getProductAction, updateProductAction } from "./actions";
import { UpdateProductDB } from "@/db/schema";
import { useParams } from "next/navigation";

export default function ActualizarProductoPage() {
  const { id } = useParams();

  const [formValues, setFormValues] = useState<UpdateProductDB>({
    name: "",
    initialPrice: 0,
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const onFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      await updateProductAction(Number(id), formValues);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    const product = await getProductAction(Number(id));
    if (!product) return;
    setFormValues(product);
  };

  useEffect(() => {
    getData();
  }, []);

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
          onChange={onFormChange}
          placeholder="Nombre del producto"
        />
        <FormLabel>Descripcion</FormLabel>
        <Textarea
          minRows={2}
          name="description"
          value={formValues.description}
          onChange={onFormChange}
          placeholder="Descripcion del producto"
        />
        <FormLabel>Precio</FormLabel>
        <Input
          startDecorator="$"
          name="initialPrice"
          type="number"
          value={formValues.initialPrice}
          onChange={onFormChange}
        />
        <Button loading={loading} onClick={onSubmit}>
          Actualizar
        </Button>
      </Sheet>
    </DashboardLayout>
  );
}
