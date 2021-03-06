const express = require('express');
const createerror = require('http-errors');
const router = express.Router();
const bcrypt = require('bcrypt');
const da = require('../controller/todo_manager');
console.log(da);
router.use(express.json());

router.post('/register',async (req,res,next)=>{
    try{
        const data = await da.create(req,res,next);
        res.status(201).send(data);
    }catch(error){
        // res.status(400).json({
        //     status:400,
        //     message:'Page Not found'
        // })
        //next(error);
        res.status(500).send({msg:error});
    }
});

router.post('/loginuser', async (req,res,next)=>{
    try {
        const logindata = await da.login(req,res);
        res.status(201).send(logindata);    
    } catch (error) {
        // next(error)
        res.status(500).send({msg:error});
    }
})

router.post('/addtasklist', async (req,res,next) => {
    try {
        const todo = await da.addtodo(req,res,next);
        res.status(201).send(todo);
    } catch (error) {
        // next(error);
        res.status(500).send({msg:error});
    }
})

router.patch('/updateuser/:id',async (req,res,next) => {
    try {
        const id = req.params.id;
        const updatu = await da.updateuser(req,res,next,id);
        res.status(201).send(updatu);    
    } catch (error) {
        // next(error);
        res.status(500).send({msg:error});
    }
})

router.get('/userdetail', async (req,res,next)=>{
    try {
        const usdata = await da.userde(req,res,next);
        res.status(201).send(usdata);
    } catch (error) {
        // next(error);
        res.status(500).send({msg:error});
    }
})

router.delete('/deletetasklist/:email', async (req,res,next) =>{
    try {
        const emailus = req.params.email;
        const deldata = await da.deletetask(req,res,next,emailus);
        res.status(201).send(deldata);
    } catch (error) {
        // next(error)
        res.status(500).send({msg:error});
    }
})


router.get('/',(req,res)=>{
    res.send("hello world");
})

router.get('/testapi',(req,res) =>{
    res.json({
        name:"Sagar",
        age:21,
        testresult:"Its is test Api"
    });
})

module.exports = router

