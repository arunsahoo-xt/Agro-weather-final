const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');
const User=require('../model/userSchema');
const generateToken = require('../utils/generateToken');


const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const userExits=await User.findOne({email});
    if(userExits){
        res.status(400);
        throw new Error("User Already Exists")
    }
    const user=await User.create({
        name,email,password
    });
    if(user){
        console.log(user);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            token:generateToken(user._id),
          
        })
    }
    else{
        res.status(400);
        throw new Error("Error occurred");
    }

});


const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Credential Empty !");
    }
       const userLogin=await User.findOne({email});//we get complete database data of said email in userLogin
        if(userLogin){
        const isMatch=await bcrypt.compare(password,userLogin.password)
        // const token=await userLogin.generateAuthToken();
        // res.cookie("jwtoken",token,{
        //     expires:new Date(Date.now()+25892000000),
        //     httpOnly:true
        // });

                    if(isMatch){
                        res.json({
                        _id:userLogin._id,
                        name:userLogin.name,
                        email:userLogin.email,
                        password:userLogin.password,
                        polyid:userLogin.polyid,
                        // token:generateToken(user._id)
                    });
                    }

                    else{
                            res.status(400)
                            throw new Error("Invalid Email Or Password");
                            }
         } 
});

const editUser=asyncHandler(async(req,res)=>{
    const {_id,polyid}=req.body;
    const user=await User.findById(_id);
    if(user){
        // user.name=name;
        user.polyid=user.polyid.concat(polyid);
        // user.email=email;

        await user.save();
        // res.status(400);
        // throw new Error("User Already Exists")
       
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            polyid:user.polyid,
           
        })
    }
    else{
        res.status(400);
        throw new Error("Error occurred");
    }

});

const deletePoly=asyncHandler(async(req,res)=>{
    const {_id,polygon_id}=req.body;
    console.log(polygon_id)
    const user1=await User.updateOne({_id},{
        $pull: {
        polyid: {_id:polygon_id}
    }
});

    if(user1){
        const user=await User.findById(_id);
      
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password,
            polyid:user.polyid,
        })
    }
    else{
        res.status(400);
        throw new Error("Error occurred");
    }

});


const addNote=asyncHandler(async(req,res)=>{
    const {_id,addnote}=req.body;
    const user=await User.findById(_id);
    if(user){
        user.notes=user.notes.concat(addnote);
        await user.save();
        res.status(201).json({
            notes:user.notes
        })
    }
    else{
        res.status(400);
        throw new Error("Error occurred");
    }

});

const getUser=asyncHandler(async(req,res)=>{
    const {_id}=req.body;
    const user=await User.findById(req.params.id);
        if(user){
                        res.json({
                        notes:user.notes
                    });
                }
                    else{
                            res.status(400)
                            throw new Error("Invalid Email Or Password");
                    }    
});
module.exports={registerUser,loginUser,editUser,deletePoly,addNote,getUser};