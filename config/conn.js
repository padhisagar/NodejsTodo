const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_Db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Database Connection Sucessfully");
}).catch(()=>{
    console.log("Not connected To database");
});