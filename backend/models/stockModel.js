const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");

const stockSchemaSupplier = new mongoose.Schema({
  stockID: {
    type: Number,
    unique: true,
  },
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
    required:true,
  },
  remainingStock: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    required: true,
  },
  dateRemaining:{
    type:String,
    default:""
  }
});

stockSchemaSupplier.plugin(AutoIncrement(mongoose), { inc_field: "stockID" });

const StockSupplier = mongoose.model("StockSupplier", stockSchemaSupplier);

module.exports = StockSupplier;
