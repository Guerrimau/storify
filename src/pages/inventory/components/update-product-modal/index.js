import React, { useState, useEffect } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField } from "@mui/material";

export const UpdateProductModal = ({
    showUpdateProductModal,
    closeUpdateProductModal,
    updateProduct,
    productData
}) => {
    const [product, setProduct] = useState({});

    const onFormChange = (e) => {
        setProduct(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setProduct(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onSaveProductClick = () => {
        //const res = await API.POST('/Update/Product', product);
        updateProduct(product);
        closeUpdateProductModal();
    }

    useEffect(() => {
        setProduct(productData);
    }, [productData])

    return (
        <Dialog open={showUpdateProductModal} onClose={closeUpdateProductModal}>
            <DialogTitle>Actualizar Producto</DialogTitle>
            <DialogContent>
                <TextField
                    id="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={product.name}
                    onChange={onFormChange} />
                <TextField
                    id="price"
                    label="Precio"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={product.price}
                    onChange={onFormChange} />
                <TextField
                    id="cost"
                    label="Costo"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={product.cost}
                    onChange={onFormChange} />
                <TextField
                    id="entryDate"
                    label="Fecha de ingreso"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={product.entryDate}
                    onChange={onFormChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeUpdateProductModal}>Cancel</Button>
                <Button onClick={onSaveProductClick}>Guardar</Button>
            </DialogActions>
        </Dialog>
    )
}
