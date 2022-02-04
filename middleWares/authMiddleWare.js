const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    if(token){
        try {
            const authUser = await jwt.verify(token, 'this signature is optional');
            User.findById(authUser.id)
                .then( user => {
                    const { userName, email, createdAt, updatedAt ,id} = user;
                    res.locals.user = { userName, email, createdAt, updatedAt ,id};
                    next();
                })
                .catch(err => {
                    res.locals.user = null;
                    next();
                })
        }
        catch (error) {
            res.locals.user = null;
            next();
        }
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {
    checkUser
}
