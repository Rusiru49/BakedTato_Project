const express = require('express');
const route = express.Router();

const { createRawMaterial,getRawMaterials,getOneRawMaterial,updateRawMaterial,deleteRawMaterial, getApprovedMaterials, getPendingRawMaterials } = require('../controller/rawMaterialController');


route.post('/createRawMaterial',createRawMaterial);
route.get('/getRawMaterials',getRawMaterials);
route.get('/raw-materials/approved',getApprovedMaterials);
route.get('/raw-materials/pending',getPendingRawMaterials);
route.get('/getOneRawMaterial/:id',getOneRawMaterial);
route.put('/updateRawMaterial/:id',updateRawMaterial);
route.delete('/deleteRawMaterial/:id',deleteRawMaterial);

export default route;