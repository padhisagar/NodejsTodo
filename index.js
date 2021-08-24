const express = require('express');
const port = process.env.PORT | 8000;
const app = express();
const createError = require('http-errors');
// require('./controller/todo_manager');
require('./Route/todo_route');
require('./config/conn');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',require('./Route/todo_route'));

// app.get('/',(request,response)=>{
//     response.json({Test:"It is test ApI"});
// })

app.use((req,res,next) => {                //404 error
    next(createError(404,"Page Not Found")); //will pass to error handler
});

app.use((err,req,res,next) => {  //its error handler
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    });
});


app.listen(port,()=>{
    try {
        console.log("Connection sucessfully");
    } catch (error) {
        console.log("Error detected");
    }
})


