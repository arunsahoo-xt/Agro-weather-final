require("dotenv").config({ path: "./config.env" });
const express = require("express");
require('./db/conn.js');
const { errorHandler ,notFound} = require('./middleware/errorMiddleware.js');
const path=require('path');


const app = express();

app.use(express.json());

 const User=require('./model/userSchema');
const auth=require('./router/authRoute');
app.use("/api/users",auth);
 


// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname,'/client/build')));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.join(__dirname,'client','build','index.html'));
// });
// }
app.use(notFound);
 app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
