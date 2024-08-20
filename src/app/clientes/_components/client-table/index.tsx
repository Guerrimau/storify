"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
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

import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { ClientDB } from "@/db/schema";

interface IProps {
  clients: ClientDB[];
}

export default function ClientTable({ clients }: IProps) {
  const [order, setOrder] = React.useState<"asc" | "desc">("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select size="sm" placeholder="Filter by status">
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
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
          <FormLabel>Buscar cliente</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="ClientTableContainer"
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
                    selected.length > 0 && selected.length !== clients.length
                  }
                  checked={selected.length === clients.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked
                        ? clients.map((client) => String(client.id))
                        : []
                    );
                  }}
                />
              </th>
              <th style={{ width: 120, padding: "12px 6px" }}>
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
                  ID
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Nombre</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Email</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Teléfono</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td style={{ textAlign: "center", width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(String(client.id))}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(String(client.id))
                          : ids.filter((itemId) => itemId !== String(client.id))
                      );
                    }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{client.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {client.firstName + " " + client.lastName}
                  </Typography>
                </td>
                <td>
                  <Typography level="body-xs">{client.email}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{client.phone}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{client.address}</Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );
}
