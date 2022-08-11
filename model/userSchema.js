const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
type:String,
required:true
    },
    password:{
type:String,
required:true
    },
    polyid:[
        {
            name:{
            type:String,
            required:true
        },
        id:{
            type:String,
            required:true
        },
        area:{
            type:String,
            // required:true
        },
        created_on:{
            type:String,
            // required:true
        }
    }],
    notes:[
        {
            note:{
            type:String,
            required:true
        },
        created_on:{
            type:String,
            required:true
        }
    }],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    // polyidd: [{
    //     name: {type: String}, // to do: change to a list
    //     id: {type: String}, // to do: change to a list
    // }]
})


//Hashing the password
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,10);
    console.log(this.password);
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken=async function(){
    try{
let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
this.tokens=this.tokens.concat({token:token});
await this.save();
return this.token;
    }
    catch(err){

    }
}


const User=mongoose.model('USER',userSchema);
module.exports=User;