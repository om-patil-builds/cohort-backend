const mongoose = require('mongoose')
require('dotenv').config()


function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)

   .then(()=>{
    console.log("connect to db")
   })

   .catch((err) => console.log(err))
    
}


module.exports = connectToDb


