const express = require("express");
const router = express.Router();
const Delivery = require("../models/DeliveryModel");
const DeliveryController = require("../controllers/DeliveryControllers");

router.get("/",DeliveryController.getAllDelivery);
router.post("/",DeliveryController.addDelivery);
router.get("/:id",DeliveryController.getDeliveryById);
router.put("/:id",DeliveryController.updateDelivery);
router.delete("/:id",DeliveryController.deleteDelivery);
//export
module.exports = router; 
