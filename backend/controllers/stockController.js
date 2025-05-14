const StockSupplier = require("../models/stockModel");
const sendEmailSupplier = require("../utils/sendEmailSupplier");

exports.addStock = async (req, res) => {
  try {
    const { name, category,currentStock} = req.body;
    const newStock = new StockSupplier({ name, category,currentStock });
    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentStock } = req.body;
    const updatedStock = await StockSupplier.findByIdAndUpdate(
      id,
      { currentStock, date: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStockAdmin = async (req, res) => {
  try {
    const stockID = req.params.id;
    const { currentStock } = req.body;

    const updatedStock = await StockSupplier.findByIdAndUpdate(
      stockID,
      {
        currentStock,
        date: Date.now()
      },
      { new: true } 
    );

    if (!updatedStock) {
      return res.status(401).json({ msg: "No such Stock Entry found to update" });
    }

    const supplierEmail = process.env.EMAIL_USER;
    const materialName = updatedStock.name || "Raw Material";

    if (parseInt(currentStock) <= 5 && supplierEmail) {
      await sendEmailSupplier(supplierEmail, materialName, "StockAlert");
    }

    res.status(200).json({ msg: "Stock Updated Successfully and Email Sent!" });
  } catch (error) {
    console.error("Error in updateStockAdmin:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    await StockSupplier.findByIdAndDelete(id);
    res.status(200).json({ message: "Stock Deleted Successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
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


