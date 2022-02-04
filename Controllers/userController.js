const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// jwt
const maxAge = 3 * 24 * 60 * 60;
const createJwtToken = (id) => jwt.sign({id}, 'this signature is optional', {expiresIn: maxAge})
//jwt

const signUpFunc = async (req, res) => {
    if(req.method === 'GET'){
        res.render('users/signUp', {pageTitle: 'Sign Up'});
    };

    if(req.method === 'POST'){
        const { userName, email, password } = req.body;
        // User.create({ userName, email, password }y)
        //     .then( user => console.log(user))
        //     .catch(err => console.log(err))

        try {
            const user = await User.create({ userName, email, password });
            // console.log(user);
            const token = createJwtToken(user.id);
            // console.log(token);
            res.cookie('jwtToken', token, {httpOnly: true, maxAge: maxAge * 1000});
            res.redirect('/');
        }
        catch (err) {
            console.log(err);
        }
    };
}

const logInFunc = (req, res) =>{
    if(req.method === 'GET'){
        res.render('users/logIn', {pageTitle: 'Log In'});
    };

    if(req.method === 'POST'){
        const { email, password } = req.body;
        User.logIn(email, password)
            .then(user => {
                const token = createJwtToken(user.id);
                res.cookie('jwtToken', token, {httpOnly: true, maxAge: maxAge * 1000});
                res.redirect('/');
            })
            .catch(err => console.log(err))
    };
}

const logOutFunc = (req, res) => {
    // res.cookie('jwtToken', '', {maxAge: 1});
    res.clearCookie('jwtToken');
    res.redirect('/');
}

module.exports = {
    signUpFunc,
    logInFunc,
    logOutFunc
}