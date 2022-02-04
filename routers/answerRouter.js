const express = require('express');
const aController = require('../Controllers/answerController');
const {checkUser} =require('../middleWares/authMiddleWare');



const aRouter = express.Router();








aRouter.all('/show-question/:id',checkUser, aController. showQuestionPage );
aRouter.all('/answerQuestion/:id' ,checkUser, aController.answerQuestionFunc);
aRouter.all('/answerQuestion/:id',checkUser, aController.showQuestionFunc);

aRouter.all('/qAndAnswer/:id',checkUser, aController.refeshPage);





module.exports = aRouter;