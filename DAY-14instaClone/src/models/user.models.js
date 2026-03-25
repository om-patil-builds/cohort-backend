const mongoose = require ("mongoose")

const userSchema = new mongoose.Schema({
     username:{
        type:String,
        required:true,
        unique:[true , "username already exits"]

     },
     email:{
        type:String,
        required:true,
        unique:[true , "email already exits"]

     },
     password:{
        type:String,
        required:true,
        
     },
     bio:{
        type:String
     },
     profileimg:{
        type:String,
        default:"https://ik.imagekit.io/ompatil021/Default-img.avif"
     }
})

const userModel = mongoose.model("users" , userSchema)

module.exports = userModel