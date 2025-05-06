const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");

const stockHistorySchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true, 
  },
  category: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  currentStock: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  remainingStock: {
    type: Number,
    required: true,
  },
  dateRemaining: {
    type: String,
    default: ""
  },
  stockRefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StockSupplier'
  }
}, { timestamps: true });

const StockHistory = mongoose.model("StockHistory", stockHistorySchema);

module.exports = StockHistory;
