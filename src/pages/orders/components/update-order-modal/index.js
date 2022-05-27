import React, { useState, useEffect } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";

export const UpdateOrderModal = ({
    showUpdateOrderModal,
    closeUpdateOrderModal,
    updateOrder,
    orderData
}) => {
    const [order, setOrder] = useState({});

    const onFormChange = (e) => {
        setOrder(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setOrder(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onSaveOrderClick = () => {
        //const res = await API.POST('/Update/Order', order);
        updateOrder(order);
        closeUpdateOrderModal();
    }

    useEffect(() => {
        setOrder(orderData);
    }, [orderData])

    return (
        <Dialog open={showUpdateOrderModal} onClose={closeUpdateOrderModal}>
            <DialogTitle>Actualizar Pedido</DialogTitle>
            <DialogContent>
                <TextField
                    id="product"
                    label="Producto"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={order.product}
                    onChange={onFormChange} />
                <TextField
                    id="cost"
                    label="Costo"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={order.cost}
                    onChange={onFormChange} />
                <TextField
                    id="date"
                    label="Fecha"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={order.date}
                    onChange={onFormChange} />
                <TextField
                    id="client"
                    label="Cliente"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={order.client}
                    onChange={onFormChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeUpdateOrderModal}>Cancel</Button>
                <Button onClick={onSaveOrderClick}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}
