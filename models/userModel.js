const mongoose = require('mongoose');
const { isEmail, isHash } = require('validator');
const bcrypt = require('bcrypt');

// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        // validate: isHash
    }
}, {timestamps: true});

// Before saving data in DB, password should be bcrypt through pre function
userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// userSchema.pre('save', function(next){
//     const saltRounds = 10;
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             this.password = hash;
//             next();
//         })
//     });
// });

// static to check the user, who is going to login
// through the static, controller can search the whole data in db
userSchema.statics.logIn = async function(email, password) {
    if(email == '') throw new Error('Email is empty!');
    if(password == '') throw new Error('Password is empty!');

    try {
        const user = await this.findOne({ email });
        // compare password with user.password
        const auth = await bcrypt.compare(password, user.password);
        if(auth) return user;
        throw new Error('Incorrect Password!');
    } catch (error) {
        throw new Error('Incorrect Email!');
    }
}

// userSchema.statics.logIn = async function(email, password) {
//     if(email == '') throw new Error('Email is empty!');
//     if(password == '') throw new Error('Password is empty!');

//     const user = await this.findOne({ email });
//     if(user){
//         // compare password with user.password
//         const auth = await bcrypt.compare(password, user.password);
//         if(auth) return user;
//         throw new Error('Incorrect Password!');
//     };
//     throw new Error('Incorrect Email!');
// }


const User = mongoose.model('user', userSchema);
module.exports = User;