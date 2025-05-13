const express = require("express");
const {
  addStock,
  deleteStock,
  getOneStock,
  getStock,
  updateStock,
  updateStockAdmin,
} = require("../controllers/stockController");


const route = express.Router(); 

route.post("/addStock", addStock);
route.get("/getStock", getStock);
route.get("/getOneStock/:id", getOneStock);
route.put("/updateStock/:id", updateStock);
route.delete("/deleteStock/:id", deleteStock);
route.put("/update-stock-admin/:id",updateStockAdmin);

module.exports = route;
