import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Typography } from "@mui/material";

const newOrderInitialState = {
    name: "",
    lastName: "",
    age: 0,
    dietBefore: false,
    amountOfPrevDiets: 0,
}

export const CreateOrderModal = ({
    showAddOrderModal,
    closeAddOrderModal,
    addOrder
}) => {
    const [newOrder, setNewOrder] = useState(newOrderInitialState);

    const onFormChange = (e) => {
        setNewOrder(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setNewOrder(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onAddOrderClick = () => {
        const newOrderObject = {
            ...newOrder,
            id: Date.now()
        }
        //const res = await API.POST('/Create/Order', newOrderObject);
        addOrder(newOrderObject);
        closeAddOrderModal();
        setNewOrder(newOrderInitialState);
    }

    return (
        <Dialog open={showAddOrderModal} onClose={closeAddOrderModal}>
            <DialogTitle>Agregar Pedido</DialogTitle>
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
                <Button onClick={closeAddOrderModal}>Cancel</Button>
                <Button onClick={onAddOrderClick}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
}
