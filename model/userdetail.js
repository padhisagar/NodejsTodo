const mongoose = require('mongoose');

const userDetail = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone_no:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    }    
})

const UserRecord = new mongoose.model("UserRecord",userDetail);
module.exports = UserRecord;