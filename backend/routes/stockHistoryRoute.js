const express = require("express");

const {
    getStockHistory,
    getStockHistoryByStockId,
  } = require("../controllers/getStockHistory");


const StockHistoryRoute = express.Router();

StockHistoryRoute.get("/getStockHistory", getStockHistory);
StockHistoryRoute.get("/getStockHistory/:id",getStockHistoryByStockId);

module.exports=StockHistoryRoute; 