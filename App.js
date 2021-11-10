const express = require("express");
import * as express from 'express';
const postRoutes = require("./Route/posts.route");
const usersRoutes = require("./Route/users.route");
const userRegisterRoutes = require ("./Route/userRegister.route")
const mongo = require("./mongo");
const jwt = require("jsonwebtoken");
const port= process.env.port;
const app = express();



(async()=>{

  try{
  //MongoBD connect
 await mongo.connect()

app.use(express.json())



app.use((req, res, next)=>{
    console.log(" common middleware Called!")
    next();
})

app.use('/usersregister', userRegisterRoutes);

app.use((req,res,next)=>{
  const token = req.headers["auth-token"];
  if(token){
    //const user = await mongo.users.findOne({ email: req.body.email });
    try{
    req.user= jwt.verify(token,"gUV!");
    // console.log(user);
    next();
    
  }catch(error){
      res.sendStatus(401)
  }
} else{
    res.sendStatus(401)
  }
  
})





app.use("/posts",postRoutes);

app.use('/users', usersRoutes);






app.listen(port,()=>{console.log(`server is running at post:${port}`)});
} 
catch(err){
  console.log("Error starting Server",err)
}
})()
