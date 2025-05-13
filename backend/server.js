const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const RawMaterials = require("./models/rawMaterialModel.js");

// Routing Imporing
const routerL = require("./routes/loginRoutes");
const productRoutes = require("./routes/productRoutes");
const route = require("./routes/rawMaterialRoute.js");
const stockSupplierRoute = require("./routes/stockSupplierRoute.js");
const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const upload = multer({ dest: uploadDir });

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/admin", adminRoutes);

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

app.post("/api/createRawMaterial", async (req, res) => {
  const { name, category, origin, description, date, status, hidden } =
    req.body;

  try {
    const newRawMaterial = new RawMaterials({
      name,
      category,
      origin,
      description,
      date,
      status: status || "Pending Approval",
      hidden: hidden || true,
    });

    await newRawMaterial.save();
    res.status(201).json({
      msg: "Raw material added successfully",
      rawMaterial: newRawMaterial,
    });
  } catch (error) {
    console.error("Error saving raw material:", error);
    res
      .status(500)
      .json({ msg: "Failed to add raw material", error: error.message });
  }
});

// Routes
app.use("/api/products", productRoutes);
app.use(express.json());
app.use("/uploads", express.static(uploadDir));
app.use("/api", routerL);
app.use("/api", route);
app.use("/api", stockSupplierRoute);
app.use("/api/orders", orderRoutes);

// DB Connections
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
