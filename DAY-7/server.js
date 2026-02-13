const app = require('./src/app.js')

require("dotenv").config() 

const connectToDb = require ('./src/config/database.js')

const mongoose = require ('mongoose')


connectToDb();




app.listen(3000 , ()=>{
    console.log("Welcome to port number 3000")
})