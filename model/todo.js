const mongoose = require('mongoose')

const todolist = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    },
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})

const TodoTask = new mongoose.model("TodoTask",todolist);

module.exports = TodoTask;