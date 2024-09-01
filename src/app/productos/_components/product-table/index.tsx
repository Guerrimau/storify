"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Avatar from "@mui/joy/Avatar";

import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { ProductDB } from "@/db/schema";

interface IProps {
  products: ProductDB[];
}

export default function ProductTable({ products }: IProps) {
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Categoría</FormLabel>
        <Select size="sm" placeholder="Todas">
          <Option value="all">Todas</Option>
          <Option value="fruits">Frutas</Option>
          <Option value="vegetables">Verduras</Option>
          <Option value="miscellaneous">Extras</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Precio</FormLabel>
        <Select size="sm" placeholder="Todos">
          <Option value="all">Todos</Option>
          <Option value="under20">Menos de $20</Option>
          <Option value="20to50">$20 - $50</Option>
          <Option value="over50">Más de $50</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Box
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar producto</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              >
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== products.length
                  }
                  checked={selected.length === products.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked
                        ? products.map((product) => String(product.id))
                        : []
                    );
                  }}
                />
              </th>
              <th style={{ width: 300, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Producto
                </Link>
              </th>
              <th style={{ width: 300, padding: "12px 6px" }}>Descripción</th>
              <th style={{ width: 150, padding: "12px 6px" }}>Precio Inicial</th>
              <th style={{ width: 150, padding: "12px 6px" }}>Accion</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ textAlign: "center" }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(String(product.id))}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(String(product.id))
                          : ids.filter(
                            (itemId) => itemId !== String(product.id)
                          )
                      );
                    }}
                  />
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
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
                    <Typography level="body-sm">{product.name}</Typography>
                  </Box>
                </td>
                <td>
                  <Typography level="body-sm">{product.description}</Typography>
                </td>
                <td>
                  <Typography level="body-sm">
                    ${product.initialPrice.toFixed(2)}
                  </Typography>
                </td>
                <td>
                  <Link href={"./productos/editar/" + product.id}>
                    <Button variant='soft'>Editar</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
