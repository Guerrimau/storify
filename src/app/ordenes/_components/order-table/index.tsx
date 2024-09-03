"use client";
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import OrderDetailsModal from "../order-details-modal";
import { SortOrder } from "@/types";
import { getComparator, stableSort } from "@/utils/stable-sort";
import { TablePagination } from "@/components";
import { MOCK_ORDERS } from "@/MOCK/mock-orders";
import { OrderStatus, OrderStatusValues } from "@/types/enums";
import { convertSnakeCaseToReadable } from "@/utils/convet-snake-case-to-readable";
import { OrderStatusChip } from "./OrderStatusChip";
import { OrderDto } from "./types";
import { NewProductDB, ProductDB } from "@/db/schema";

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        {/* <MenuItem>Editar</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider /> */}
        <MenuItem color="danger">Archivar</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable({
  orders,
  avaialbleProducts,
}: {
  orders: OrderDto[];
  avaialbleProducts: ProductDB[];
}) {
  const [order, setOrder] = React.useState<SortOrder>("desc");
  const [open, setOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<any | null>();

  const onOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  const filters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filtrar por status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          {OrderStatusValues.map((status) => (
            <Option key={status} value={status}>
              {convertSnakeCaseToReadable(status)}
            </Option>
          ))}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Cliente</FormLabel>
        <Select size="sm" placeholder="Todos">
          <Option value="all">Todos</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <OrderDetailsModal
        viewMode={false}
        availableProducts={avaialbleProducts}
        open={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
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
          <FormLabel>Buscar</FormLabel>
          <Input
            size="sm"
            placeholder="Buscar orden"
            startDecorator={<SearchIcon />}
          />
        </FormControl>
        {filters()}
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
              <th style={{ width: 120, padding: "12px 12px" }}>
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
                  Recibo
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Fecha</th>
              <th style={{ width: 240, padding: "12px 6px" }}>Cliente</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Pagado</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
              <th style={{ width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            {stableSort(orders, getComparator(order, "id")).map((row) => (
              <tr
                key={row.id}
                style={{ cursor: "pointer" }}
                onClick={() => onOrderClick(row)}
              >
                <td style={{ paddingLeft: "12px" }}>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row.deliveryDate}</Typography>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Avatar size="sm">{row.client.firstName?.charAt(0)}</Avatar>
                    <div>
                      <Typography level="body-xs">
                        {row.client.firstName} {row.client.lastName}
                      </Typography>
                      <Typography level="body-xs">
                        {row.client.email}
                      </Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  {row.paid ? (
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={<CheckRoundedIcon />}
                      color="success"
                    >
                      Pagado
                    </Chip>
                  ) : (
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={<AccessTimeIcon />}
                      color="neutral"
                    >
                      Pendiente
                    </Chip>
                  )}
                </td>
                <td>
                  <OrderStatusChip>{row.status as OrderStatus}</OrderStatusChip>
                </td>
                <td>{RowMenu()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <TablePagination />
    </React.Fragment>
  );
}
