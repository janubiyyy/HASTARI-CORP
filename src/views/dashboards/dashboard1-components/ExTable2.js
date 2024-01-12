import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';

const initialData2 = [
  { id: 1, ternak: "Ternak", luas: "105M", jumlahternak: 11 },
  { id: 2, ternak: "Ternak 2", luas: "125M", jumlahternak: 20 },
  { id: 3, ternak: "Ternak 3", luas: "135M", jumlahternak: 30 },
  { id: 4, ternak: "Ternak 4", luas: "115M", jumlahternak: 50 },
  { id: 5, ternak: "Ternak 5", luas: "155M", jumlahternak: 30 },
  // tambahkan data lainnya sesuai kebutuhan
];

const ExTable = () => {
  const [data, setData] = useState(initialData2);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ ternak: "", luas: "", jumlahternak: 0 });
  const [editingId, setEditingId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleEdit = (id) => {
    const editedData = data.find((item) => item.id === id);
    setFormData({ ...editedData });
    setEditingId(id);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setSnackbarMessage("Data berhasil dihapus");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ ternak: "", luas: "", jumlahternak: 0 });
    setEditingId(null);
  };

  const handleAddData = () => {
    if (!formData.ternak || !formData.luas || formData.jumlahternak === 0) {
      setSnackbarMessage("Harap isi semua field terlebih dahulu.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (editingId !== null) {
      // Jika sedang edit, lakukan update data
      const updatedData = data.map((item) =>
        item.id === editingId ? { ...item, ...formData } : item
      );
      setData(updatedData);
      setSnackbarMessage("Data berhasil diupdate");
      setSnackbarSeverity("success");
    } else {
      // Jika sedang tambah data baru
      const newData = [...data, { id: data.length + 1, ...formData }];
      setData(newData);
      setSnackbarMessage("Data berhasil ditambahkan");
      setSnackbarSeverity("success");
    }
    handleCloseDialog();
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => {
          handleOpenDialog();
          setEditingId(null);
        }}
      >
        Tambah Data
      </Button>
      <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Ternak</TableCell>
            <TableCell>Luas</TableCell>
            <TableCell>Jumlah Ternak</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{item.ternak}</TableCell>
              <TableCell>{item.luas}</TableCell>
              <TableCell>{item.jumlahternak}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(item.id)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(item.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingId !== null ? "Edit Data Ternak" : "Tambah Data Ternak"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Masukan Ternak"
            fullWidth
            margin="normal"
            value={formData.ternak}
            onChange={(e) => setFormData({ ...formData, ternak: e.target.value })}
          />
          <TextField
            label="Masukan Luas Ternak"
            fullWidth
            margin="normal"
            value={formData.luas}
            onChange={(e) => setFormData({ ...formData, luas: e.target.value })}
          />
          <TextField
            label="Masukan Jumlah Ternak"
            fullWidth
            margin="normal"
            type="number"
            value={formData.jumlahternak}
            onChange={(e) =>
              setFormData({
                ...formData,
                jumlahternak: parseInt(e.target.value, 10),
              })
            }
          />
          <Button variant="contained" onClick={handleAddData}>
            {editingId !== null ? "Edit Data Ternak" : "Tambah Data Ternak"}
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          iconMapping={{
            success: <CheckCircleIcon />,
            error: <ErrorIcon />,
            warning: <WarningIcon />,
            info: <InfoIcon />,
          }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default ExTable;
