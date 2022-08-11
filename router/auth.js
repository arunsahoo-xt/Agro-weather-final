const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');

require('../db/conn.js');

const User=require('../model/userSchema');
const authenticate=require('../middleware/authenticate');

// app.get('/',(req,res)=>{
//     res.send("hellow world from the other side");
//     });

router.post('/register',async (req,res)=>{

    const {name,email,password,polyid}=req.body;
    if(!name || !email || !password){
        return res.status(422).json({error:"fill properly"});
    }

    try{
       const userExist=await User.findOne({email:email});
            if(userExist){
                return res.status(401).json({error:"Email already Exist"});
            }
            const user=new User({name,email,password});
            //Different method
    // const user=await User.create({
    //     name,email,password
    // });
        const userRegister=await user.save();
         if(userRegister){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            password:user.password
        });
       
         }
         else{
        res.status(400)
        throw new error("error occurred");
         }
    }
    catch(err){
  console.log(err);
}
})

    
router.post('/login',async (req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).send("error:Credential Empty");
    }

    try{
       const userLogin=await User.findOne({email:email});//we get complete database data of said email in userLogin
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
                        password:userLogin.password
                    });
                    }

                    else{
                            res.status(400)
                            throw new error("Invalid Email Or Password");
                            }
         }


         else{
        res.status(400).json({error:"login failed"})
         }
    }
    catch(err){
  console.log(err);
}
})

//ABOUT US PAGE
router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser);
    });

module.exports=router;