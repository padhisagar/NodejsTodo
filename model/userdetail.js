const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    tokens:[{
        token:{
            type:String,
            required:false
        }
    }]    
})

userDetail.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        // console.log(token);
        this.tokens = this.tokens.concat({token:token});
        await this.save(); 
        return token;
    } catch (error) {
        res.send(error);
    }
}


// userDetail.pre("save", async function(next){
//     this.Password = await bcrypt.hash(this.Password,12);
//     console.log("From model file " + this.Password);
//     next();
// })

const UserRecord = new mongoose.model("UserRecord",userDetail);
module.exports = UserRecord;