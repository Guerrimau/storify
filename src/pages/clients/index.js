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
import { CreateClientModal } from "./components/create-client-modal";
import { UpdateClientModal } from "./components/update-client-modal";

const updateClientModalInitialState = {
    show: false,
    client: {}
};

export const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [updateClientModal, setUpdateClientModal] = useState(updateClientModalInitialState);

    const openUpdateClientModal = (client) => {
        setUpdateClientModal({
            client,
            show: true
        });
    }

    const closeUpdateClientModal = () => {
        setUpdateClientModal(updateClientModalInitialState);
    }

    const openAddClientModal = () => {
        setShowAddClientModal(true);
    };

    const closeAddClientModal = () => {
        setShowAddClientModal(false);
    }

    const addClient = (newClient) => {
        setClients(clients.concat([newClient]));
    }

    const updateClient = (updatedClient) => {
        const newClientList = clients.map(client => {
            if(client.id === updatedClient.id) {
                return updatedClient;
            } else {
                return client;
            }
        })
        setClients(newClientList);
    };

    const onDeleteClientClick = async (deletedId) => {
        //const res = await API.POST('/Delete/Client', { clientId });
        const newClientList = clients.filter(client => client.id !== deletedId);
        setClients(newClientList);
    }

    return (
        <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "250px calc(100vw - 250px)" }}>
            <Sidebar />
            <main style={{ padding: "60px" }}>
                <Typography variant="h4">Clientes</Typography>
                {clients.length > 0
                    ? <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell align="right">Correo</TableCell>
                                    <TableCell align="right">Telefono</TableCell>
                                    <TableCell align="right">Direccion</TableCell>
                                    <TableCell align="right">Negocio</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clients.map((client) => (
                                    <TableRow
                                        key={client.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {client.name}
                                        </TableCell>
                                        <TableCell align="right">{client.email}</TableCell>
                                        <TableCell align="right">{client.phone}</TableCell>
                                        <TableCell align="right">{client.address}</TableCell>
                                        <TableCell align="right">{client.businessName}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => openUpdateClientModal(client)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onDeleteClientClick(client.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Stack justifyContent="center" direction="row" sx={{ marginTop: "20px" }}>
                        <Typography color="grey">Aún no se han registrado clientes.</Typography>
                    </Stack>
                }

                <Stack direction="row-reverse" sx={{ marginTop: "20px" }}>
                    <Button
                        startIcon={<PersonAddIcon />}
                        variant="contained"
                        onClick={openAddClientModal}>Agregar</Button>
                </Stack>

                <CreateClientModal
                    showAddClientModal={showAddClientModal}
                    closeAddClientModal={closeAddClientModal}
                    addClient={addClient} />

                <UpdateClientModal
                    showUpdateClientModal={updateClientModal.show}
                    closeUpdateClientModal={closeUpdateClientModal}
                    clientData={updateClientModal.client}
                    updateClient={updateClient} />
            </main>
        </div>
    )
}
