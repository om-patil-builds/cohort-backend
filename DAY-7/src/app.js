const express = require ('express')
const noteModel = require('./model/notes.model.js')

const app = express();


app.use(express.json())




app.post('/notes' , async (req,res)=>{
  
const {title , description} = req.body


 const note = await noteModel.create({
    title,description
    
})

res.status(201).json({
   message:"note created",
   note
})





})

module.exports = app
