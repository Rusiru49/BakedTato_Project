const express = require('express')
const { createRawMaterial,
    getRawMaterials,
    getOneRawMaterial,
    updateRawMaterial,
    deleteRawMaterial,
    getApprovedMaterials,
    getPendingRawMaterials } = require('../controllers/rawMaterialController');

const route = express.Router();

route.post('/createRawMaterial',createRawMaterial);
route.get('/getRawMaterials',getRawMaterials);
route.get('/raw-materials/approved',getApprovedMaterials);
route.get('/raw-materials/pending',getPendingRawMaterials);
route.get('/getOneRawMaterial/:id',getOneRawMaterial);
route.put('/updateRawMaterial/:id',updateRawMaterial);
route.delete('/deleteRawMaterial/:id',deleteRawMaterial);

export default route;