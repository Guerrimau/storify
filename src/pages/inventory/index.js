import React, { useState } from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Sidebar } from "../../components/sidebar";
import { CreateProductModal } from "./components/create-product-modal";
import { UpdateProductModal } from "./components/update-product-modal";

const updateProductModalInitialState = {
    show: false,
    product: {}
};

export const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [updateProductModal, setUpdateProductModal] = useState(updateProductModalInitialState);

    const openUpdateProductModal = (product) => {
        setUpdateProductModal({
            product,
            show: true
        });
    }

    const closeUpdateProductModal = () => {
        setUpdateProductModal(updateProductModalInitialState);
    }

    const openAddProductModal = () => {
        setShowAddProductModal(true);
    };

    const closeAddProductModal = () => {
        setShowAddProductModal(false);
    }

    const addProduct = (newProduct) => {
        setProducts(products.concat([newProduct]));
    }

    const updateProduct = (updatedProduct) => {
        const newProductList = products.map(product => {
            if(product.id === updatedProduct.id) {
                return updatedProduct;
            } else {
                return product;
            }
        })
        setProducts(newProductList);
    };

    const onDeleteProductClick = async (deletedId) => {
        //const res = await API.POST('/Delete/Product', { productId });
        const newProductList = products.filter(product => product.id !== deletedId);
        setProducts(newProductList);
    }

    return (
        <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "250px calc(100vw - 250px)" }}>
            <Sidebar />
            <main style={{ padding: "60px" }}>
                <Typography variant="h4">Inventario</Typography>
                {products.length > 0
                    ? <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell align="right">Precio</TableCell>
                                    <TableCell align="right">Costo</TableCell>
                                    <TableCell align="right">Fecha de ingreso</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {product.name}
                                        </TableCell>
                                        <TableCell align="right">${product.price}</TableCell>
                                        <TableCell align="right">{product.cost}</TableCell>
                                        <TableCell align="right">{product.entryDate}</TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={() => openUpdateProductModal(product)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => onDeleteProductClick(product.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Stack justifyContent="center" direction="row" sx={{ marginTop: "20px" }}>
                        <Typography color="grey">Aún no se han registrado productos.</Typography>
                    </Stack>
                }

                <Stack direction="row-reverse" sx={{ marginTop: "20px" }}>
                    <Button
                        startIcon={<PersonAddIcon />}
                        variant="contained"
                        onClick={openAddProductModal}>Agregar</Button>
                </Stack>

                <CreateProductModal
                    showAddProductModal={showAddProductModal}
                    closeAddProductModal={closeAddProductModal}
                    addProduct={addProduct} />

                <UpdateProductModal
                    showUpdateProductModal={updateProductModal.show}
                    closeUpdateProductModal={closeUpdateProductModal}
                    productData={updateProductModal.product}
                    updateProduct={updateProduct} />
            </main>
        </div>
    )
}
