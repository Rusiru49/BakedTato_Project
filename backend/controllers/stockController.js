const StockSupplier = require("../models/stockModel");
const StockHistory = require("../models/stockHistoryModel");

exports.addStock = async (req, res) => {
  const { name, category, unit, currentStock, date } = req.body;

  if (!name || !category || !unit || !currentStock || !date) {
    return res.status(400).json({ msg: "Please provide all required fields." });
  }

  try {
    const stock = new StockSupplier({
      name,
      category,
      unit,
      currentStock,
      remainingStock: Number(currentStock), 
      date,
    });

    const savedData = await stock.save();
    res.status(201).json({ msg: "Your New Stock has been Added Successfully!", data: savedData });
  } catch (error) {
    console.error("Error saving stock:", error);
    res.status(500).json({ error: "An error occurred while adding the stock!" });
  }
};

exports.getStock = async (req, res) => {
  try{
    const stock = await StockSupplier.find();
    if (!stock || stock.length === 0) {
      return res.status(404).json({ msg: "No Records Found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getOneStock = async (req, res) => {
  try {
    const stockID = req.params.id;
    const stockExists = await StockSupplier.findById(stockID);

    if (!stockExists) {
      return res.status(404).json({ msg: "No Stock Found" });
    }
    res.status(200).json(stockExists);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { currentStock, date } = req.body; 
    const stockID = req.params.id; 

    const parsedStock = Number(currentStock); 

    if (!parsedStock || isNaN(parsedStock)) {
      return res.status(400).json({ msg: "Invalid current Stock value" });
    }

    const stock = await StockSupplier.findById(stockID);
    if (!stock) {
      return res.status(404).json({ msg: "Stock not found" });
    }

    const oldRemaining = stock.remainingStock || 0;
    const newRemaining = oldRemaining + parsedStock;

    stock.currentStock = parsedStock;       
    stock.remainingStock = newRemaining; 
    console.log("New date to save:", req.body.date);   
    stock.date = req.body.date;

    const updated = await stock.save();

    const history = new StockHistory({
      id:stock._id,
      name: stock.name,
      category: stock.category,
      unit: stock.unit,
      currentStock: parsedStock,
      date: req.body.date,
      remainingStock: newRemaining,
      dateRemaining: req.body.date
    });

    await history.save();

    console.log("Updated stock:", stock); 

    res.status(200).json({ msg: "Stock Added Successfully!", updated });
  } catch (error) {
    console.error("Error in updateStock:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const stockID = req.params.id;
    const stockExists = await StockSupplier.findById(stockID);

    if (!stockExists) {
      return res.status(401).json({ msg: "Can't find stock to delete" });
    }

    await StockSupplier.findByIdAndDelete(stockID);
    res.status(200).json({ msg: "Stock Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
