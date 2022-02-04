const express = require('express');
require('./config/mongoose');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./routers/routers');
const userRouter = require('./routers/userRouter');
const questionRouter = require('./routers/questionRouter');
const answerRouter =require('./routers/answerRouter');

const app = express();

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.session = req.session;
    next()
  })

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use('/user', router);
app.use(cookieParser());
app.use(router, userRouter, questionRouter,answerRouter);

app.set('view engine', 'ejs');

app.listen(3000, () => console.log('Listening to the port 3000 ...'));
