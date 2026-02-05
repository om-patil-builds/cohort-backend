const express = require('express')

const server = express()

server.get('/', (req, res) => {
  res.send('Hello World')
})

server.get('/about', (req, res) => {
  res.send('Hello From About Page')
})

server.listen(3000, () => {
  console.log("server is running on port 3000")
})
