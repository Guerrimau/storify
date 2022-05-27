import React, { useState, useEffect } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";

export const UpdateProviderModal = ({
    showUpdateProviderModal,
    closeUpdateProviderModal,
    updateProvider,
    providerData
}) => {
    const [provider, setProvider] = useState({});

    const onFormChange = (e) => {
        setProvider(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setProvider(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onSaveProviderClick = () => {
        //const res = await API.POST('/Update/Provider', provider);
        updateProvider(provider);
        closeUpdateProviderModal();
    }

    useEffect(() => {
        setProvider(providerData);
    }, [providerData])

    return (
        <Dialog open={showUpdateProviderModal} onClose={closeUpdateProviderModal}>
            <DialogTitle>Actualizar Proveedor</DialogTitle>
            <DialogContent>
            <TextField
                    id="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={provider?.name}
                    onChange={onFormChange} />
                <TextField
                    id="email"
                    label="Correo"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={provider?.email}
                    onChange={onFormChange} />
                <TextField
                    id="phone"
                    label="Telefono"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={provider?.phone}
                    onChange={onFormChange} />
                <TextField
                    id="address"
                    label="Direccion"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={provider?.address}
                    onChange={onFormChange} />
                <TextField
                    id="businessName"
                    label="Nombre del negocio"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={provider?.businessName}
                    onChange={onFormChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeUpdateProviderModal}>Cancel</Button>
                <Button onClick={onSaveProviderClick}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}
