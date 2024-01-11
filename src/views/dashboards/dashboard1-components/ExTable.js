import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
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

const initialData = [
  {id:1, kandang: "Kandang 1", luas: "105 M", jumlahternak: 120 },
  {id:2, kandang: "Kandang 2", luas: "115 M", jumlahternak: 130 },
  {id:3, kandang: "Kandang 3", luas: "85 M", jumlahternak: 150 },
  {id:4, kandang: "Kandang 4", luas: "102 M", jumlahternak: 110 },

  // tambahkan data lainnya sesuai kebutuhan
];

const ExTable = () => {
  const [data, setData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ kandang: "", luas: "", jumlahternak: 0 });
  const [editingId, setEditingId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // success, error, warning, info

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
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ kandang: "", luas: "", jumlahternak: 0 });
    setEditingId(null);
  };

  const handleAddData = () => {
    if (!formData.kandang || !formData.luas || formData.jumlahternak === 0) {
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
          setEditingId(null); // Pastikan id edit direset saat menambah data baru
        }}
      >
        Tambah Data
      </Button>
      <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Kandang</TableCell>
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
              <TableCell>{item.kandang}</TableCell>
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
        <DialogTitle>{editingId !== null ? "Edit Data Kandang" : "Tambah Data Kandang"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Masukan Kandang"
            fullWidth
            margin="normal"
            value={formData.kandang}
            onChange={(e) => setFormData({ ...formData, kandang: e.target.value })}
          />
          <TextField
            label="Masukan Luas Kandang"
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
            {editingId !== null ? "Edit Data Kandang" : "Tambah Data Kandang"}
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
  >
    {snackbarMessage}
  </MuiAlert>
</Snackbar>

    </Box>
  );
};

export default ExTable;
