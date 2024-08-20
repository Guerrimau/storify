"use client";

import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Sheet, Stack } from "@mui/joy";
import { DashboardLayout } from "@/components";
import { Typography } from "@mui/joy";
import { createClientAction } from "./actions";

export default function AgregarClientePage() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const onAddClick = async () => {
    setLoading(true);
    await createClientAction(formValues);
  };

  const onFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  return (
    <DashboardLayout>
      <Typography level="h1">Agregar Cliente</Typography>
      <Sheet
        variant="outlined"
        component={Stack}
        direction="column"
        width={350}
        p={2}
        spacing={1}
      >
        <FormControl>
          <FormLabel>Nombre</FormLabel>
          <Input
            name="firstName"
            value={formValues.firstName}
            onChange={onFormChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Apellido</FormLabel>
          <Input
            name="lastName"
            value={formValues.lastName}
            onChange={onFormChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formValues.email}
            onChange={onFormChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Teléfono</FormLabel>
          <Input
            name="phone"
            value={formValues.phone}
            onChange={onFormChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Dirección</FormLabel>
          <Input
            name="address"
            value={formValues.address}
            onChange={onFormChange}
            required
          />
        </FormControl>
        <Button type="submit" loading={loading} onClick={onAddClick}>
          Agregar Cliente
        </Button>
      </Sheet>
    </DashboardLayout>
  );
}
