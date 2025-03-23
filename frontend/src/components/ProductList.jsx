import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

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

  return (
    <Paper sx={{ padding: 3, margin: "auto", maxWidth: 900 }}>
      <Typography 
        variant="h5" 
        align="center" 
        gutterBottom 
        sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "24px", fontWeight: 700 }}
      >
        Product List
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 600 }}>
                Image
              </TableCell>
              <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 600 }}>
                Description
              </TableCell>
              <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 600 }}>
                Price (Rs.)
              </TableCell>
              <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 600 }}>
                Stock
              </TableCell>
              <TableCell 
                sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 600 }} 
                align="center"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} hover>
                {/* Display the image */}
                <TableCell>
                  {product.image && (
                    <img
                      src={product.image} // Assuming `product.image` contains the image URL
                      alt={product.name}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}>
                  {product.description}
                </TableCell>
                <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}>
                  {product.price}
                </TableCell>
                <TableCell sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}>
            Are you sure you want to delete this product? This action cannot be undone.
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
