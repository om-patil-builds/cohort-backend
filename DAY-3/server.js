const express = require('express')
const server = express()

server.use(express.json())
const notes = []
server.post('/notes', (req, res) => {
 console.log(req.body)
 notes.push(req.body)
 res.send('notes created')
})

server.get('/notes',(req,res)=>{
    res.send(notes)
})

server.listen(3000, () => {

  console.log('server running on 3000 port')
})
