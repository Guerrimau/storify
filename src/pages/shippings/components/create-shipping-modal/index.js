import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Typography } from "@mui/material";

const newShippingInitialState = {
    name: "",
    lastName: "",
    age: 0,
    dietBefore: false,
    amountOfPrevDiets: 0,
}

export const CreateShippingModal = ({
    showAddShippingModal,
    closeAddShippingModal,
    addShipping
}) => {
    const [newShipping, setNewShipping] = useState(newShippingInitialState);

    const onFormChange = (e) => {
        setNewShipping(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setNewShipping(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onAddShippingClick = () => {
        const newShippingObject = {
            ...newShipping,
            id: Date.now()
        }
        //const res = await API.POST('/Create/Shipping', newShippingObject);
        addShipping(newShippingObject);
        closeAddShippingModal();
        setNewShipping(newShippingInitialState);
    }

    return (
        <Dialog open={showAddShippingModal} onClose={closeAddShippingModal}>
            <DialogTitle>Agregar Envio</DialogTitle>
            <DialogContent>
            <TextField
                    id="product"
                    label="Producto"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
                <TextField
                    id="cost"
                    label="Costo"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
                <TextField
                    id="date"
                    label="Fecha"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
                <TextField
                    id="client"
                    label="Cliente"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAddShippingModal}>Cancel</Button>
                <Button onClick={onAddShippingClick}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
}
