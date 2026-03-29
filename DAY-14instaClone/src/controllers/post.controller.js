const mongoose = require ("mongoose")
const postModel = require ("../models/post.models")
const express = require("express")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require ("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const cookieParser = require("cookie-parser")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
          console.log(req.body , req.file)


 const token = req.cookies.token
 
       if(!token){
        return res.status(401).json({
            message:"Token not provided , unthorized access"
        })
       }
       
       let decoded = null
       try{
       decoded = jwt.verify(token , process.env.JWT_SECRET)

       } catch(err){
            return res.status(401).json({
                message:"user not authorized"
            })
       }
            
    
    console.log(decoded)

        const file = await imagekit.files.upload({
            file: await toFile(req.file.buffer, 'file') ,
            fileName: "Test",
            folder:"cohort-2-insta-clone-posts"
        })
       const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
       })
       res.status(201).json({
        message:"post is created successfully.",
        post

       })
}

async function getPostController(req,res){
    const token = req.cookies.token

    if(!token){
    return res.status(401).json({
        message:"Token not provided"
    })
}

    let decoded;
    try{
      decoded = jwt.verify(token , process.env.JWT_SECRET )
     }//galat token jata hai to use err handle karne keliye try catch
     catch(err){
        return res.status(401).json({
            message:"token invalid",
            error: err.message
        })
     }

     const userId = decoded.id

     const posts = await postModel.find({
        user:userId
     })

     res.status(200).json({
        message:"Posts fetched successfully",
        posts,
     })

}


async function getPostDetailsController(req, res){

//hume ye figrout karna padta hai ki user kon hai like konsa user req kar raha hai yani usi ki post ko req kar raha hai yaha nahi uske liye hum token ka use karte hai
const token = req.cookies.token

//agar hume token nahi mila to hum yahi se return karva dete hai

if(!token){
    return res.status(401).json({
        message:"unAuthorized Access"
    })
}

//agar token milta bhi hai to then hum use verify karte hai decoded se
//jo bhi token ke andar data rehga o mil jayega decode ke andar

let decoded;
try{
   decoded = jwt.verify(token, process.env.JWT_SECRET)
}catch(err){
    return res.status(401).json({
        message:"Invalid token"
    })
}

//decoded ke andar se hume user ki id miljati hai
const userId = decoded.id
const postId = req.params.postId

const post = await postModel.findById(postId)

if(!post){
    return res.status(404).json({
        message:"post not found."
    })
}

const isValidUser = post.user.toString() === userId
//object id hi aayegi lekin toString ki help se String me convert ho jayegi

if(!isValidUser){
    return res.status(403).json({
        message:"Forbidden Content"
    })
}

return res.status(200).json({
    message:"Post fetches succefully"
})

}

module.exports = {createPostController , getPostController , getPostDetailsController}