const express = require ("express")
const mongoose = require("mongoose")

require("dotenv").config()

function connectToDb (){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("db connected succesfully")
    })
}

module.exports = connectToDb