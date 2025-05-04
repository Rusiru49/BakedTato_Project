import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getAllProducts, deleteProduct } from "../services/api";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { Edit, Delete, PictureAsPdf } from "@mui/icons-material";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProductId) {
      await deleteProduct(selectedProductId);
      fetchProducts();
      setOpenDialog(false);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Product List", 14, 22);

    const headers = ["Name", "Description", "Price (Rs.)", "Stock"];
    const data = products.map((product) => [
      product.name,
      product.description,
      product.price,
      product.stock,
    ]);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 30,
      theme: "grid",
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 3,
        overflow: "linebreak",
      },
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
      },
    });

    doc.save("product_list.pdf");
  };

  return (
    <Paper sx={{ padding: 3, margin: "auto", maxWidth: 900 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownloadPDF}
        startIcon={<PictureAsPdf />}
        sx={{
          mb: 2,
          fontFamily: "'Roboto', sans-serif",
          textTransform: "none",
          fontWeight: 600,
          backgroundColor: "#FFA726",
          "&:hover": {
            backgroundColor: "#FB8C00",
          },
        }}
      >
        Download
      </Button>

      {/* Card View for Total Products Count */}
      <Card sx={{ mb: 3, backgroundColor: "#FFCC80", borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <Inventory2OutlinedIcon sx={{ color: 'primary.main' }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 600,
                color: 'text.secondary',
              }}
            >
              Total Products:&nbsp;
              <Typography
                component="span"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                }}
              >
                {products.length}
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Image
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Price (Rs.)
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Stock
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} hover>
                <TableCell>
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}
                >
                  {product.name}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}
                >
                  {product.description}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}
                >
                  {product.price}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}
                >
                  {product.stock}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/edit/${product._id}`}
                    color="primary"
                    sx={{ fontSize: "18px" }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenDialog(product._id)}
                    color="error"
                    sx={{ fontSize: "18px" }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle
          sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}
        >
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}
          >
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            sx={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            sx={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductList;
