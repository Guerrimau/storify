import React, { useState, useEffect } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";

export const UpdateClientModal = ({
    showUpdateClientModal,
    closeUpdateClientModal,
    updateClient,
    clientData
}) => {
    const [client, setClient] = useState({});

    const onFormChange = (e) => {
        setClient(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setClient(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onSaveClientClick = () => {
        //const res = await API.POST('/Update/Client', client);
        updateClient(client);
        closeUpdateClientModal();
    }

    useEffect(() => {
        setClient(clientData);
    }, [clientData])

    return (
        <Dialog open={showUpdateClientModal} onClose={closeUpdateClientModal}>
            <DialogTitle>Actualizar cliente</DialogTitle>
            <DialogContent>
                <TextField
                    id="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={client?.name}
                    onChange={onFormChange} />
                <TextField
                    id="email"
                    label="Correo"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={client?.email}
                    onChange={onFormChange} />
                <TextField
                    id="phone"
                    label="Telefono"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={client?.phone}
                    onChange={onFormChange} />
                <TextField
                    id="address"
                    label="Direccion"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={client?.address}
                    onChange={onFormChange} />
                <TextField
                    id="businessName"
                    label="Nombre del negocio"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={client?.businessName}
                    onChange={onFormChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeUpdateClientModal}>Cancel</Button>
                <Button onClick={onSaveClientClick}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}
