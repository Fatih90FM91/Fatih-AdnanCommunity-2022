const mongoose = require('mongoose');
const Schema =require('mongoose');
const  User =require('../models/userModel');
const mySchema = mongoose.Schema;

const questionSchema = new mySchema({

        question:{
            type:String,
            required:true,
            
            
            
        },
       description:{
            type:String,
            required:true,
            
            
            
        },

        user_id: 

        {    type: Schema.Types.ObjectId,
             ref: User
         }
    ,


})

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
