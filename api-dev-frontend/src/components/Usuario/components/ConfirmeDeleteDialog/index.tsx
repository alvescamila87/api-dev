import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

interface ConfirmDeleteDialogProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteDialog = ({
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) => {
  return (
    <>
      <IconButton color="error" onClick={onConfirm}>
        <DeleteIcon />
      </IconButton>

      <Dialog open onClose={onClose}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
