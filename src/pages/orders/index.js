import React, { useState } from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Sidebar } from "../../components/sidebar";
import { CreateOrderModal } from "./components/create-order-modal";
import { UpdateOrderModal } from "./components/update-order-modal";

const updateOrderModalInitialState = {
    show: false,
    order: {}
};

export const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [updateOrderModal, setUpdateOrderModal] = useState(updateOrderModalInitialState);

    const openUpdateOrderModal = (order) => {
        setUpdateOrderModal({
            order,
            show: true
        });
    }

    const closeUpdateOrderModal = () => {
        setUpdateOrderModal(updateOrderModalInitialState);
    }

    const openAddOrderModal = () => {
        setShowAddOrderModal(true);
    };

    const closeAddOrderModal = () => {
        setShowAddOrderModal(false);
    }

    const addOrder = (newOrder) => {
        setOrders(orders.concat([newOrder]));
    }

    const updateOrder = (updatedOrder) => {
        const newOrderList = orders.map(order => {
            if(order.id === updatedOrder.id) {
                return updatedOrder;
            } else {
                return order;
            }
        })
        setOrders(newOrderList);
    };

    const onDeleteOrderClick = async (deletedId) => {
        //const res = await API.POST('/Delete/Order', { orderId });
        const newOrderList = orders.filter(order => order.id !== deletedId);
        setOrders(newOrderList);
    }

    return (
        <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "250px calc(100vw - 250px)" }}>
            <Sidebar />
            <main style={{ padding: "60px" }}>
                <Typography variant="h4">Pedidos</Typography>
                {orders.length > 0
                    ? <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell align="right">Costo</TableCell>
                                    <TableCell align="right">Fecha</TableCell>
                                    <TableCell align="right">Cliente</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow
                                        key={order.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {order.product}
                                        </TableCell>
                                        <TableCell align="right">{order.cost}</TableCell>
                                        <TableCell align="right">{order.date}</TableCell>
                                        <TableCell align="right">{order.client}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => openUpdateOrderModal(order)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onDeleteOrderClick(order.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Stack justifyContent="center" direction="row" sx={{ marginTop: "20px" }}>
                        <Typography color="grey">Aún no se han registrado pedidos.</Typography>
                    </Stack>
                }

                <Stack direction="row-reverse" sx={{ marginTop: "20px" }}>
                    <Button
                        startIcon={<PersonAddIcon />}
                        variant="contained"
                        onClick={openAddOrderModal}>Agregar</Button>
                </Stack>

                <CreateOrderModal
                    showAddOrderModal={showAddOrderModal}
                    closeAddOrderModal={closeAddOrderModal}
                    addOrder={addOrder} />

                <UpdateOrderModal
                    showUpdateOrderModal={updateOrderModal.show}
                    closeUpdateOrderModal={closeUpdateOrderModal}
                    orderData={updateOrderModal.order}
                    updateOrder={updateOrder} />
            </main>
        </div>
    )
}
