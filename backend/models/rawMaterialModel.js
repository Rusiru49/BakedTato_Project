const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");

const rawMaterialSchema = new mongoose.Schema({
  rawMaterialID: {
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
  origin: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending Approval",
    enum: ["Pending Approval", "Approved", "Rejected"],
  },
  hidden: {
    type: Boolean,
    default: true,
  },
});

rawMaterialSchema.plugin(AutoIncrement(mongoose), {
  inc_field: "rawMaterialID",
});

const RawMaterials = mongoose.model("RawMaterials", rawMaterialSchema);

module.exports = RawMaterials;
