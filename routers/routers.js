const express = require('express');
const controller = require('../Controllers/controller');
const {checkUser} = require('../middleWares/authMiddleWare');

const router = express.Router();

router.get('/' ,checkUser ,controller.getHome);

module.exports = router;