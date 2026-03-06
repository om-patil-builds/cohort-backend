const mongoose = require('mongoose')
const app = require ('./src/app.js')
const connectToDb = require ('./src/config/database')

connectToDb()

app.listen(3000 , (req,res)=>{
    console.log("running on port no 3000")
})