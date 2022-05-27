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
import { CreateProviderModal } from "./components/create-provider-modal";
import { UpdateProviderModal } from "./components/update-provider-modal";

const updateProviderModalInitialState = {
    show: false,
    provider: {}
};

export const ProvidersPage = () => {
    const [providers, setProviders] = useState([]);
    const [showAddProviderModal, setShowAddProviderModal] = useState(false);
    const [updateProviderModal, setUpdateProviderModal] = useState(updateProviderModalInitialState);

    const openUpdateProviderModal = (provider) => {
        setUpdateProviderModal({
            provider,
            show: true
        });
    }

    const closeUpdateProviderModal = () => {
        setUpdateProviderModal(updateProviderModalInitialState);
    }

    const openAddProviderModal = () => {
        setShowAddProviderModal(true);
    };

    const closeAddProviderModal = () => {
        setShowAddProviderModal(false);
    }

    const addProvider = (newProvider) => {
        setProviders(providers.concat([newProvider]));
    }

    const updateProvider = (updatedProvider) => {
        const newProviderList = providers.map(provider => {
            if(provider.id === updatedProvider.id) {
                return updatedProvider;
            } else {
                return provider;
            }
        })
        setProviders(newProviderList);
    };

    const onDeleteProviderClick = async (deletedId) => {
        //const res = await API.POST('/Delete/Provider', { providerId });
        const newProviderList = providers.filter(provider => provider.id !== deletedId);
        setProviders(newProviderList);
    }

    return (
        <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "250px calc(100vw - 250px)" }}>
            <Sidebar />
            <main style={{ padding: "60px" }}>
                <Typography variant="h4">Proveedores</Typography>
                {providers.length > 0
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
                                {providers.map((provider) => (
                                    <TableRow
                                        key={provider.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {provider.name}
                                        </TableCell>
                                        <TableCell align="right">{provider.email}</TableCell>
                                        <TableCell align="right">{provider.phone}</TableCell>
                                        <TableCell align="right">{provider.address}</TableCell>
                                        <TableCell align="right">{provider.businessName}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => openUpdateProviderModal(provider)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onDeleteProviderClick(provider.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Stack justifyContent="center" direction="row" sx={{ marginTop: "20px" }}>
                        <Typography color="grey">Aún no se han registrado proveedores.</Typography>
                    </Stack>
                }

                <Stack direction="row-reverse" sx={{ marginTop: "20px" }}>
                    <Button
                        startIcon={<PersonAddIcon />}
                        variant="contained"
                        onClick={openAddProviderModal}>Agregar</Button>
                </Stack>

                <CreateProviderModal
                    showAddProviderModal={showAddProviderModal}
                    closeAddProviderModal={closeAddProviderModal}
                    addProvider={addProvider} />

                <UpdateProviderModal
                    showUpdateProviderModal={updateProviderModal.show}
                    closeUpdateProviderModal={closeUpdateProviderModal}
                    providerData={updateProviderModal.provider}
                    updateProvider={updateProvider} />
            </main>
        </div>
    )
}
