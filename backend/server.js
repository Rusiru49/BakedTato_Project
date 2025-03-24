const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const routerL = require("./routes/loginRoutes");


// Import routes
const productRoutes = require("./routes/productRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: uploadDir });

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from the frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json()); // Parse JSON request bodies

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});


// Routes
app.use("/api/products", productRoutes);
app.use(express.json())
app.use("/uploads", express.static(uploadDir));
app.use("/api", routerL);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));