const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const signup= async(req,res)=>{
  
    try{

    const {name,email,password}=req.body;

    if(!name||!email||!password){
        return res.status(400).json({
            success:false,
            message:"All Fields are required"
        });
    }

    const existingUser=await User.findOne({email});

    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        });
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
        name,
        email,
        password:hashedPassword
    });

    const token=jwt.sign(
        
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}

    );

    res.status(201).json({
        success:true,
        message:"User Created",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        },
    });

   }catch(err){

     res.status(500).json({
        success:false,
        message:err.message
     });
   }


};

module.exports={
    signup,

};