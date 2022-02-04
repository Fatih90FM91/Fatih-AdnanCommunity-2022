const express = require('express');
const qController = require('../Controllers/questionController');
const {checkUser} =require('../middleWares/authMiddleWare');

const qRouter = express.Router();

qRouter.get('/showQuestion',checkUser, qController.showQuestion);

qRouter.all('/askQuestion',checkUser, qController.questions);

qRouter.get('/delete-question/:id', qController.delQuestion);

qRouter.all('/edit-question/:id',checkUser, qController.updateQuestion);




module.exports = qRouter;