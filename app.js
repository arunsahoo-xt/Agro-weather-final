
const dotenv=require('dotenv');
const express=require('express');
const jwt=require('jsonwebtoken');
const { errorHandler ,notFound} = require('./middleware/errorMiddleware.js');
const path = require('path');
const app=express();
dotenv.config({path:'./config.env'});
require('./db/conn.js');
app.use(express.json());
const PORT=process.env.PORT || 5000;
// app.use(express.urlencoded({ extended: false }));

//THIS SECTION IS FOR EXPERIMENTAL USE-->

// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');

// // configure the app to use bodyParser()
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

//USE THIS SECTION TO REFER VARIATION <--


const User=require('./model/userSchema');
const auth=require('./router/authRoute');

app.use("/api/users",auth);

 

//  if(process.env.NODE_ENV === 'production')
// {
//     app.use(express.static("agro_weather/build"));
//     // const path=require("path");
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'agro_weather','build','index.html'));
//     })
// }

if (process.env.NODE_ENV === 'production') {
// Exprees will serve up production assets
    app.use(express.static(path.join('/agro_weather/build')));
  
// Express serve up index.html file if it doesn't recognize route
   
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname,'agro_weather','build','index.html'));
    });
  }
  
  app.use(notFound);
  app.use(errorHandler); 
  
  // app.get('/*', (req, res) => {
  //   let url = path.join(__dirname, '../agro_weather/build', 'index.html');
  //   if (!url.startsWith('/app/')) // we're on local windows
  //     url = url.substring(1);
  //   res.sendFile(url);
  // });
app.listen(PORT,()=>{
    console.log(`successful listenting at ${PORT}`);
});
