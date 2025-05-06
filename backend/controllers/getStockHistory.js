const StockHistory = require("../models/stockHistoryModel");


exports.getStockHistory = async (req, res) => {
  try {
    const history = await StockHistory.find();
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching stock history:", error);
    res.status(500).json({ msg: "Failed to fetch stock history", error: error.message });
  }
};

 
exports.getStockHistoryByStockId = async (req, res) => {
    try {
      const stockID = req.params.id;
  
      const history = await StockHistory.find({ stockRefId: stockID });
  
      if (!history || history.length === 0) {
        return res.status(404).json({ msg: "No history found for this stock item" });
      }
  
      res.status(200).json(history);
    } catch (error) {
      console.error("Error fetching stock history by ID:", error);
      res.status(500).json({ msg: "Failed to fetch stock history", error: error.message });
    }
  };
  



