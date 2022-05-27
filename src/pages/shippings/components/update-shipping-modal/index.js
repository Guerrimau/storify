import React, { useState, useEffect } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";

export const UpdateShippingModal = ({
    showUpdateShippingModal,
    closeUpdateShippingModal,
    updateShipping,
    shippingData
}) => {
    const [shipping, setShipping] = useState({});

    const onFormChange = (e) => {
        setShipping(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setShipping(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onSaveShippingClick = () => {
        //const res = await API.POST('/Update/Shipping', shipping);
        updateShipping(shipping);
        closeUpdateShippingModal();
    }

    useEffect(() => {
        setShipping(shippingData);
    }, [shippingData])

    return (
        <Dialog open={showUpdateShippingModal} onClose={closeUpdateShippingModal}>
            <DialogTitle>Actualizar Proveedor</DialogTitle>
            <DialogContent>
            <TextField
                    id="product"
                    label="Producto"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={shipping.product}
                    onChange={onFormChange} />
                <TextField
                    id="cost"
                    label="Costo"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={shipping.cost}
                    onChange={onFormChange} />
                <TextField
                    id="date"
                    label="Fecha"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={shipping.date}
                    onChange={onFormChange} />
                <TextField
                    id="client"
                    label="Cliente"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={shipping.client}
                    onChange={onFormChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeUpdateShippingModal}>Cancel</Button>
                <Button onClick={onSaveShippingClick}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}
