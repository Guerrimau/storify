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
import { CreateShippingModal } from "./components/create-shipping-modal";
import { UpdateShippingModal } from "./components/update-shipping-modal";

const updateShippingModalInitialState = {
    show: false,
    shipping: {}
};

export const ShippingsPage = () => {
    const [shippings, setShippings] = useState([]);
    const [showAddShippingModal, setShowAddShippingModal] = useState(false);
    const [updateShippingModal, setUpdateShippingModal] = useState(updateShippingModalInitialState);

    const openUpdateShippingModal = (shipping) => {
        setUpdateShippingModal({
            shipping,
            show: true
        });
    }

    const closeUpdateShippingModal = () => {
        setUpdateShippingModal(updateShippingModalInitialState);
    }

    const openAddShippingModal = () => {
        setShowAddShippingModal(true);
    };

    const closeAddShippingModal = () => {
        setShowAddShippingModal(false);
    }

    const addShipping = (newShipping) => {
        setShippings(shippings.concat([newShipping]));
    }

    const updateShipping = (updatedShipping) => {
        const newShippingList = shippings.map(shipping => {
            if(shipping.id === updatedShipping.id) {
                return updatedShipping;
            } else {
                return shipping;
            }
        })
        setShippings(newShippingList);
    };

    const onDeleteShippingClick = async (deletedId) => {
        //const res = await API.POST('/Delete/Shipping', { shippingId });
        const newShippingList = shippings.filter(shipping => shipping.id !== deletedId);
        setShippings(newShippingList);
    }

    return (
        <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "250px calc(100vw - 250px)" }}>
            <Sidebar />
            <main style={{ padding: "60px" }}>
                <Typography variant="h4">Envios</Typography>
                {shippings.length > 0
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
                                {shippings.map((shipping) => (
                                    <TableRow
                                        key={shipping.id}
                                        sx={{ '&:last-child td, &:last-child th': { bshipping: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {shipping.product}
                                        </TableCell>
                                        <TableCell align="right">{shipping.cost}</TableCell>
                                        <TableCell align="right">{shipping.date}</TableCell>
                                        <TableCell align="right">{shipping.client}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => openUpdateShippingModal(shipping)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onDeleteShippingClick(shipping.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Stack justifyContent="center" direction="row" sx={{ marginTop: "20px" }}>
                        <Typography color="grey">Aún no se han registrado envios.</Typography>
                    </Stack>
                }

                <Stack direction="row-reverse" sx={{ marginTop: "20px" }}>
                    <Button
                        startIcon={<PersonAddIcon />}
                        variant="contained"
                        onClick={openAddShippingModal}>Agregar</Button>
                </Stack>

                <CreateShippingModal
                    showAddShippingModal={showAddShippingModal}
                    closeAddShippingModal={closeAddShippingModal}
                    addShipping={addShipping} />

                <UpdateShippingModal
                    showUpdateShippingModal={updateShippingModal.show}
                    closeUpdateShippingModal={closeUpdateShippingModal}
                    shippingData={updateShippingModal.shipping}
                    updateShipping={updateShipping} />
            </main>
        </div>
    )
}
