const express = require("express");
const route = express.Router();

const {
  createRawMaterial,
  getRawMaterials,
  getOneRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
  getApprovedMaterials,
  getPendingRawMaterials,
  updateRawMaterialAdmin,
  deleteRawMaterialAdmin,
  deleteRawMaterialForever,
} = require("../controllers/rawMaterialController");

route.post("/createRawMaterial", createRawMaterial);
route.get("/getRawMaterials", getRawMaterials);
route.get("/raw-materials/approved", getApprovedMaterials);
route.get("/raw-materials/pending", getPendingRawMaterials);
route.get("/getOneRawMaterial/:id", getOneRawMaterial);
route.put("/updateRawMaterial/:id", updateRawMaterial);
route.put("/updateRawMaterialAdmin/:id",updateRawMaterialAdmin);
route.delete("/deleteRawMaterial/:id", deleteRawMaterial);
route.delete("/deleteRawMaterialAdmin/:id",deleteRawMaterialAdmin);
route.delete("/deleteRawMaterialForever/:id",deleteRawMaterialForever);


module.exports = route;
