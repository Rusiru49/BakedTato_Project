const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");

const stockSchemaSupplier  = new mongoose.Schema({
  name: { type: String, required: true },
  category:{type:String, required:true},
  currentStock: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

stockSchemaSupplier.plugin(AutoIncrement(mongoose), { inc_field: "stockID" });

const StockSupplier = mongoose.model("StockSupplier", stockSchemaSupplier);

module.exports = StockSupplier;
