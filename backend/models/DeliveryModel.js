const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
    
    },
    order: {
        type: String
        
    }
});

module.exports = mongoose.model("DeliveryModel", deliverySchema);