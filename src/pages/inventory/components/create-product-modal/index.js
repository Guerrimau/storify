import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Typography } from "@mui/material";

const newProductInitialState = {
    name: "",
    lastName: "",
    age: 0,
    dietBefore: false,
    amountOfPrevDiets: 0,
}

export const CreateProductModal = ({
    showAddProductModal,
    closeAddProductModal,
    addProduct
}) => {
    const [newProduct, setNewProduct] = useState(newProductInitialState);

    const onFormChange = (e) => {
        setNewProduct(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    }

    const onDietBeforeClick = (e) => {
        setNewProduct(prevState => ({
            ...prevState,
            dietBefore: e.target.checked
        }));
    }

    const onAddProductClick = () => {
        const newProductObject = {
            ...newProduct,
            id: Date.now()
        }
        //const res = await API.POST('/Create/Product', newProductObject);
        addProduct(newProductObject);
        closeAddProductModal();
        setNewProduct(newProductInitialState);
    }

    return (
        <Dialog open={showAddProductModal} onClose={closeAddProductModal}>
            <DialogTitle>Agregar Producto</DialogTitle>
            <DialogContent>
                <TextField
                    id="name"
                    label="Nombre"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
                <TextField
                    id="price"
                    label="Precio"
                    type="number"
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
                    id="entryDate"
                    label="Fecha de ingreso"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={onFormChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeAddProductModal}>Cancel</Button>
                <Button onClick={onAddProductClick}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
}
