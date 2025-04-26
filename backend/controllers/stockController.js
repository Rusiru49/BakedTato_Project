const StockSupplier = require("../models/stockModel");

exports.addStock = async (req, res) => {
  const { name, category, unit, currentStock, date } = req.body;

  if (!name || !category || !unit || !currentStock || !date) {
    return res.status(400).json({ msg: "Please provide all required fields." });
  }

  try {
    const stock = new StockSupplier(req.body);
    const savedData = await stock.save();
    res.status(201).json({ msg: "Stock Added Successfully", data: savedData });
  } catch (error) {
    console.error("Error saving stock:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the stock." });
  }
};

exports.getStock = async (req, res) => {
  try {
    const stock = await StockSupplier.find();

    if (!stock) {
      return res.status(404).json({ msg: "No Records Found" });
    }

    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ error: error });
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
    res.status(500).json({ error: error });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const stockID = req.params.id;
    const stockExists = await StockSupplier.findById(stockID);

    if (!stockExists) {
      return res.status(401).json({ msg: "Can't find stock to update" });
    }

    const updatedStock = await StockSupplier.findByIdAndUpdate(
      stockID,
      req.body,
      { new: true },
    );
    res.status(200).json({ msg: "Stock Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
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
    res.status(500).json({ error: error });
  }
};
