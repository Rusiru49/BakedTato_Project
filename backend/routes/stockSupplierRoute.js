const express = require("express");
const {
  addStock,
  deleteStock,
  getOneStock,
  getStock,
  updateStock,
} = require("../controllers/stockController");


const route = express.Router();

route.post("/addStock", addStock);
route.get("/getStock", getStock);
route.get("/getOneStock/:id", getOneStock);
route.put("/updateStock/:id", updateStock);
route.delete("/deleteStock/:id", deleteStock);

module.exports = route;
