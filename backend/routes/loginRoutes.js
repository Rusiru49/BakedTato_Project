const express = require('express');
const routerL = express.Router();
const loginControlller = require('../controllers/loginController');
const checkingControlller = require('../controllers/checkingController');

routerL.post('/addLogin', loginControlller.addLogin);
routerL.post('/checkLogin', checkingControlller.checkLogin);
routerL.get('/users', loginControlller.getUser);
routerL.post('/updateuser', loginControlller.updateUser);
routerL.post('/deleteUser', loginControlller.deleteUser);

module.exports = routerL;