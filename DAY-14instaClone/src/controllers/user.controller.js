const express = require("express")
const bcrypt = require ('bcryptjs')
const jwt = require ("jsonwebtoken")
const userModel = require("../models/user.models")

async function registerController (req,res){
    const {username , email , password , bio , profileimg  } = req.body

    const isUserAlreadyExists = await userModel.findOne({

        $or:[
            {username} ,
            {email} 
        ] //or operator array mangata hai aur usme multiple cond rehati hai
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists" + (isUserAlreadyExists.email === 
            email? "Email alredy exists" : "username already exits" )
        })  
    }

   
    const hashPassword = bcrypt.hash(password , 10)

    const user = await userModel.create({
        username , email , password:hashPassword
         , bio , profileimg
    })

  const token = jwt.sign({
    id:user._id,
    
  } , 
  process.env.JWT_SECRET , {expiresIn:"1d"}
)    
res.cookie("token" , token)

res.status(201).json({
    message:"user registered succssefully",
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileimg:user.profileimg
    }
    
    
})
}

async function loginController(req,res){
     const {username , email , password} = req.body

     const user = await userModel.findOne({
        $or:[
            {username:user.username} ,
            {email:user.email}
            ,
            
        ]

     })
     if(!user){
        return res.status(404).json({
             message: "User have no account"
        })
     }
    const hash = await bcrypt.compare(password , user.password)

    
        //hashing ki acchi bat same i/p dene se same o/p harbar milega
    
    
       // const isPasswordValid = hash === user.password
        if(!isPasswordValid) {
            return res.status(401).json({
                message:"invalid password"
            })
        }

        const token = jwt.sign({
                id:user._id,
                email:user.email
            }, process.env.JWT_SECRET , {expiresIn:"1h"})
        
            res.cookie("token" ,token )
        
            res.status(201).json({
            message:"User logged in succefully" , 
            user:{
                username: user.username,
                email:user.email,
                bio:user.bio,
                profileimg:user.profileimg
            }
        })

        
}



module.exports ={
registerController,
loginController
}