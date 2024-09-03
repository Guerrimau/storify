import { removeProductAction } from "@/app/productos/actions";
import { DeleteForever } from "@mui/icons-material";
import {
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalDialog,
  Typography,
  IconButton,
  Stack
} from "@mui/joy";

import React from "react";

export default function DeleteButton({ productId }: { productId: number }) {

  const [open, setOpen] = React.useState<boolean>(false);

  const confirmDelete = async () => {
    try {
      await removeProductAction(Number(productId));
    } catch (error) {
    } finally {
      setOpen(false);
      console.log("Producto eliminado");
    }
  }

  return (
    <React.Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteForever />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>
            <Typography level="h2">Eliminar producto</Typography>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Typography>
                ¿Estás seguro de que deseas eliminar este producto?
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={() => confirmDelete()} color="danger">
                  Eliminar
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>

  )
}
