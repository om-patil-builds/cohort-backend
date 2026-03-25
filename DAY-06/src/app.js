const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send('chetan back live nunu')
})

module.exports = express ()