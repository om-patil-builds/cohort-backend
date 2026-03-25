const express = require ('express')
const userModel = require('../models/user.model')

const jwt = require ("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require ('cookie-parser')

const authRouter = express.Router()

module.exports = authRouter

authRouter.post("/register" , async (req,res)=>{

    const {name , email , password} = req.body

    const UserAlreadyExits = await userModel.findOne({email}) 

    if(UserAlreadyExits){
        return res.status(400).json({
             message: "user already exits with this email address"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user =  await userModel.create({
        name , email , password:hashedPassword
    })

    const token = jwt.sign(
    {
        id:user._id ,
        email: user.email
    },
    process.env.JWT_SECRET
)

res.cookie("jwt_token" , token)

    res.status(201).json({
        message:"user registred" , 
        user, 
        token

    } )

})

authRouter.post("/protected" , (req,res)=>{

    console.log(req.cookies);

    res.status(200).json({
        message:"this is protected route"
    })
    
})

authRouter.post("/login" , async (req,res)=>{
    const {email , password} = req.body

    const   user =  await userModel.findOne({email})
    if(!user){
        return res.status(409).json({
            message:"User have no account"

        })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign(
       {
        id:user._id ,
        email: user.email ,
       }  , process.env.JWT_SECRET
)

    res.cookie("jwt_token" , token)

    res.status(200).json({
        message:"user logged in" ,
        user ,
        token
    })


})
module.exports =  authRouter

