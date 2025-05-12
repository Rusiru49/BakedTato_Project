const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence");

const addonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderItem = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    toppings: {
      type: [addonSchema],
      default: [],
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
  },
  products: {
    type: [orderItem],
    required: true,
    validate: {
      validator: function (items) {
        return items.length > 0;
      },
      message: "Order must contain at least one product",
    },
  },
  orderDateTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Completed", "Cancelled"],
  },
  orderDispatchDateTime: {
    type: Date,
    default: null,
  },
  specialInstructions: {
    type: String,
    default: "",
  },
  isPreOrder: {
    type: Boolean,
    default: false,
  },
  preOrderDateTime: {
    type: Date,
    default: null,
  },
  preOrderStatus: {
    type: String,
    enum: ["Pending", "Ready", "Cancelled"],
    default: "Pending",
  },
});

orderSchema.plugin(AutoIncrement(mongoose), { inc_field: "orderId" });

const orderSchemaModel = mongoose.model("Orders", orderSchema);

module.exports = orderSchemaModel;
