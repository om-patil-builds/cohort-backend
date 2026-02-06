const express = require('express')

const server = express()

server.use(express.json())

const notes = []

server.post('/notes', (req,res)=>{
    console.log(req.body)
    res.send("notes Recieved")
})

server.listen(3000,()=>{
    console.log("server is running on port 3000")
})