import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, createProduct, updateProduct } from "../services/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import {
  UploadFile,
  AddPhotoAlternate,
  Cancel,
  Description,
  Category,
  AttachMoney,
  Inventory,
} from "@mui/icons-material";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  // Validation
  const [validation, setValidation] = useState({
    name: true,
    description: true,
    price: true,
    stock: true,
    category: true,
    image: true,
  });

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
      setPreviewImage(data.image);
    } catch (error) {
      setError("Failed to fetch product details.");
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (fieldName, value) => {
    let isValid = true;

    switch (fieldName) {
      case "name":
        isValid = value.trim() !== "";
        break;
      case "description":
        isValid = value.trim() !== "";
        break;
      case "price":
        isValid = /^[0-9]+(\.[0-9]{1,2})?$/.test(value);
        break;
      case "stock":
        isValid = /^[0-9]+$/.test(value) && parseInt(value) >= 0;
        break;
      case "category":
        isValid = value.trim() !== "";
        break;
      case "image":
        isValid = selectedFile || product.image;
        break;
      default:
        break;
    }

    setValidation((prev) => ({ ...prev, [fieldName]: isValid }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setValidation((prev) => ({ ...prev, image: true }));
    } else {
      setError("Only JPG or PNG files are allowed!");
      setValidation((prev) => ({ ...prev, image: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let imageUrl = "";

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        imageUrl = data.imageUrl;
      } catch (error) {
        setError("Failed to upload image.");
        return;
      }
    } else if (id) {
      imageUrl = product.image;
    }
    try {
      if (id) {
        await updateProduct(id, { ...product, image: imageUrl });
      } else {
        await createProduct({ ...product, image: imageUrl });
      }
      navigate("/");
    } catch (error) {
      setError("Failed to save product.");
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ p: 3, boxShadow: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {id ? "Edit Product" : "Create Product"}
        </Typography>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Name"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!validation.name}
                  helperText={!validation.name ? "Name is required" : ""}
                  InputProps={{
                    startAdornment: <AddPhotoAlternate />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!validation.category}
                  helperText={
                    !validation.category ? "Category is required" : ""
                  }
                  InputProps={{
                    startAdornment: <Category />,
                  }}
                  select
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select a Category</option>
                  <option value="Baked Potato">Baked Potato</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Specialty">Specialty</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  error={!validation.description}
                  helperText={
                    !validation.description ? "Description is required" : ""
                  }
                  InputProps={{
                    startAdornment: <Description />,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Price (Rs.)"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!validation.price}
                  helperText={!validation.price ? "Invalid price" : ""}
                  InputProps={{
                    startAdornment: <AttachMoney />,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  label="Stock"
                  name="stock"
                  type="number"
                  value={product.stock}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  error={!validation.stock}
                  helperText={!validation.stock ? "Invalid stock" : ""}
                  InputProps={{
                    startAdornment: <Inventory />,
                  }}
                />
              </Grid>

              {/* Image uploading */}
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="upload-image"
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#E3A008",
                      "&:hover": { backgroundColor: "#D18F07" },
                    }}
                    color="primary"
                    fullWidth
                    component="span"
                    startIcon={<UploadFile />}
                  >
                    {selectedFile ? "Change Image" : "Upload Image"}
                  </Button>
                </label>
              </Grid>

              {previewImage && (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <img
                      src={previewImage}
                      alt="Product Preview"
                      style={{
                        borderRadius: "8px",
                        maxWidth: "100%",
                        maxHeight: 250,
                        objectFit: "contain",
                        border: "1px solid #ddd",
                      }}
                    />
                    <IconButton
                      sx={{ mt: 1 }}
                      color="error"
                      onClick={() => {
                        setPreviewImage(null);
                        setSelectedFile(null);
                        setValidation((prev) => ({ ...prev, image: false }));
                      }}
                    >
                      <Cancel />
                    </IconButton>
                  </Box>
                </Grid>
              )}
            </Grid>

            {error && (
              <Typography
                color="error"
                align="center"
                sx={{
                  mt: 2,
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {error}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#8B4513",
                  "&:hover": { backgroundColor: "#7A3E10" },
                }}
                disabled={!Object.values(validation).every(Boolean)}
              >
                {id ? "Update Product" : "Create Product"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductForm;
