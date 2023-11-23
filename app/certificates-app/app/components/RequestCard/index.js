import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import certificateService from "@/app/services/certificateService";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RequestCard({
  request,
  onDeleteSuccess,
  onEditSuccess,
  user,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(request.status);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      await certificateService.updateCertificateStatus(requestId, newStatus);
      onEditSuccess(requestId, newStatus);
      toast.success("Status atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      toast.error("Erro ao atualizar o status.");
    }
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSaveStatus = async () => {
    await updateRequestStatus(request.id, status);
    setEditMode(false);
  };

  const handleDelete = async () => {
    try {
      await certificateService.deleteCertificate(request.id);
      handleClose();
      onDeleteSuccess(request.id);
      toast.success("Solicitação excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a solicitação:", error);
      toast.error("Erro ao excluir a solicitação.");
    }
  };

  return (
    <>
      <Card sx={{ position: "relative", mb: 2, minHeight: 120 }}>
        <CardContent>
          <Typography variant="h5">{request.fullName}</Typography>
          <Typography
            variant="p"
            sx={{
              textTransform: "capitalize",
            }}
          >
            {request.certificateType}
          </Typography>
          <Typography color="text.primary" fontWeight={"bold"}>
            Status:{" "}
            {editMode ? (
              <FormControl fullWidth>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="pendente">Pendente</MenuItem>
                  <MenuItem value="emitida">Emitida</MenuItem>
                  <MenuItem value="negada">Negada</MenuItem>
                </Select>
              </FormControl>
            ) : (
              request.status
            )}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            padding: 0,
          }}
        >
          {(user?.profile === "admin" || request.status !== "emitida") && (
            <IconButton onClick={handleClickOpen} sx={{ mb: 1 }}>
              <DeleteIcon />
            </IconButton>
          )}

          {((user?.profile === "operator" && request.status !== "emitida") ||
            user?.profile === "admin") &&
            !editMode && (
              <IconButton onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            )}

          {editMode &&
            (user?.profile === "operator" || user?.profile === "admin") && (
              <Button size="small" color="primary" onClick={handleSaveStatus}>
                Salvar
              </Button>
            )}
        </CardActions>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmar exclusão"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza de que deseja excluir esta solicitação?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
