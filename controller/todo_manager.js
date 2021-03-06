const mongoose = require('mongoose');
const UserRecord = require('../model/userdetail');
const TodoTask = require('../model/todo');
const createerror = require('http-errors');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authroute = joi.object({
    firstname: joi.string().min(3),
    email: joi.string().min(2),
    phone: joi.number().min(6),
    password: joi.string().min(2).max(10),
})

// const create = (req, res) => {
//     console.log(req.body);
//     const userdetail = new UserRecord({
//         Name: req.body.firstname,
//         Email: req.body.email,
//         Phone_no: req.body.phone,
//         Password: req.body.password
//     })

//     return userdetail.save().then((result)=>{
//         console.log(result);
//         return result;
//     }).catch((err)=>{
//         return err;
//     })
// }

// const create = async (req, res, next) => {
//     try {
//         const userdetail = await UserRecord({
//             Name: req.body.firstname,
//             Email: req.body.email,
//             Phone_no: req.body.phone,
//             Password: req.body.password
//         })
//         const createuser = await userdetail.save();
//         return createuser;
//     } catch (error) {
//         return error;
//     }
// };
const create = async (req, res, next) => {
    try {
        const userdetail =new UserRecord({
            Name: req.body.firstname,
            Email: req.body.email,
            Phone_no: req.body.phone,
            Password: req.body.password
        })
        const vali = await authroute.validateAsync(req.body);
        if (vali.error != null) {
            next(createerror(400, "data are not validated"))
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            userdetail.Password =  bcrypt.hashSync(req.body.password,salt);
            console.log(userdetail.password);
            const createuser = await userdetail.save();
            return createuser;
        }
    } catch (error) {
        return error;
    }
};
const login = async (req,res) => {
    try {
        const a = req.body.email;
        const data = await UserRecord.findOne({ Email: a });
        const result = bcrypt.compareSync(req.body.password, data.Password);
        if(result){
            const token = await data.generateAuthToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 3000),
                httpOnly: true
            });
            return data;
        }
        else{
            return error;
        }
    } catch (error) {
        return error;
    }
}

const userde = async (req, res, next) => {
    try {
        const userdetail = await UserRecord.find();
        return userdetail;
    } catch (error) {
        return error
    }
}

const addtodo = async (req, res, next) => {
    try {
        const addtask = new TodoTask({
            email: req.body.email,
            task: req.body.task,
            active: req.body.active
        })

        const addtodolist = await addtask.save();
        return addtodolist;
    } catch (error) {
        return error;
    }
}

const updateuser = async (req, res, next, id) => {
    try {
        console.log(id);
        const updatedd = await UserRecord.updateOne({ _id: id }, { $set: { Name: req.body.name } });
        console.log(updatedd);
        return updatedd;
    } catch (error) {
        return error;
    }
}

const deletetask = async (req, res, next, emailus) => {
    try {
        console.log(emailus);
        const deltask = await TodoTask.deleteOne({ email: emailus });
        return deltask;
    } catch (error) {
        return error;
    }
}

module.exports.create = create
module.exports.login = login
module.exports.addtodo = addtodo;
module.exports.updateuser = updateuser;
module.exports.userde = userde;
module.exports.deletetask = deletetask;