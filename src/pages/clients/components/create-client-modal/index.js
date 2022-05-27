import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Typography } from "@mui/material";

const newClientInitialState = {
    name: "",
    email: "",
    phone: 0,
    address: "",
    businessName: "",
}

export const CreateClientModal = ({
    showAddClientModal,
    closeAddClientModal,
    addClient
}) => {
    const [newClient, setNewClient] = useState(newClientInitialState);

    const onFormChange = (e) => {
        setNewClient(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setNewClient(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onAddClientClick = () => {
        const newClientObject = {
            ...newClient,
            id: Date.now()
        }
        //const res = await API.POST('/Create/Client', newClientObject);
        addClient(newClientObject);
        closeAddClientModal();
        setNewClient(newClientInitialState);
    }

    return (
        <Dialog open={showAddClientModal} onClose={closeAddClientModal}>
            <DialogTitle>Agregar cliente</DialogTitle>
            <DialogContent>
                <TextField
                    id="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
                <TextField
                    id="email"
                    label="Correo"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
                <TextField
                    id="phone"
                    label="Telefono"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
                <TextField
                    id="address"
                    label="Direccion"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
                <TextField
                    id="businessName"
                    label="Nombre del negocio"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAddClientModal}>Cancel</Button>
                <Button onClick={onAddClientClick}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
}
