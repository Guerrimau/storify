import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Typography } from "@mui/material";

const newProviderInitialState = {
    name: "",
    lastName: "",
    age: 0,
    dietBefore: false,
    amountOfPrevDiets: 0,
}

export const CreateProviderModal = ({
    showAddProviderModal,
    closeAddProviderModal,
    addProvider
}) => {
    const [newProvider, setNewProvider] = useState(newProviderInitialState);

    const onFormChange = (e) => {
        setNewProvider(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setNewProvider(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onAddProviderClick = () => {
        const newProviderObject = {
            ...newProvider,
            id: Date.now()
        }
        //const res = await API.POST('/Create/Provider', newProviderObject);
        addProvider(newProviderObject);
        closeAddProviderModal();
        setNewProvider(newProviderInitialState);
    }

    return (
        <Dialog open={showAddProviderModal} onClose={closeAddProviderModal}>
            <DialogTitle>Agregar Proveedor</DialogTitle>
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
                <Button onClick={closeAddProviderModal}>Cancel</Button>
                <Button onClick={onAddProviderClick}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
}
