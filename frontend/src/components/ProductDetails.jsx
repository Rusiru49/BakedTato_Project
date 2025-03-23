import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import { getProductById } from "../services/api";
import { Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Using useNavigate for navigation
  const [product, setProduct] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false); // State for the update dialog

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const data = await getProductById(id);
    setProduct(data);
  };

  const handleUpdateConfirm = () => {
    // Navigate to the edit page after confirming the update
    navigate(`/edit/${id}`); // Using navigate to redirect to the edit page
    setOpenUpdateDialog(false); // Close the dialog after navigating
  };

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true); // Open the update dialog
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4">{product.name}</Typography>
      <Typography>{product.description}</Typography>
      <Typography>Price: Rs.{product.price}</Typography>
      <Typography>Stock: {product.stock}</Typography>
      <Typography>Category: {product.category}</Typography>
      <img src={product.image} alt={product.name} style={{ width: "100%" }} />
      
      {/* Edit Button */}
      <Button variant="contained" color="primary" onClick={handleOpenUpdateDialog}>
        Edit
      </Button>

      {/* Update Confirmation Dialog */}
      <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
        <DialogTitle>Ready to Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can now update this product. Do you want to proceed to the update page?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateConfirm} color="primary">
            Proceed to Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;
