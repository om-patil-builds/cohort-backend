const express = require ('express')
const noteModel = require('./models/model.notes.js')
const cors = require ('cors')

const app = express();

app.use(cors())
app.use(express.json())

app.post('/api/notes' , async(req,res)=>{
   const {title , description} = req.body

const note = await  noteModel.create({
      title,description
   })

   res.status(201).json({
      message:"notes create succefully",
      note
   })
} )


app.get('/api/notes' , async (req,res)=>{
   const note = await noteModel.find()

   res.status(200).json({
      message:"notes fetched succfully",
      note
   })
})

app.delete('/api/notes/:id' , async (req,res)=>{
  const id = req.params.id

 const note = await noteModel.findByIdAndDelete(id)
 console.log(id)

  res.status(200).json({
      message:"notes deleted succfully",
      note
   })

})

app.patch('/api/notes/:id' , async (req,res)=>{
   const id = req.params.id
   const {description} = req.body
   const note = await  noteModel.findByIdAndUpdate(id , {description})

     res.status(200).json({
      message:"notes updated succfully",
      note
   })
})



 
module.exports = app