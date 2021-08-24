const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/TodoList",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Database Connection Sucessfully");
}).catch(()=>{
    console.log("Not connected To database");
});