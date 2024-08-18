"use client";

import { Button, Typography } from "@mui/joy";
import { DashboardLayout } from "@/components";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <Typography>Productos</Typography>
      <Link href={"./productos/agregar"}>
        <Button variant="soft">Agregar producto</Button>
      </Link>
    </DashboardLayout>
  );
}
