const express = require ('express')

const app = express()
 
app.get('/' , (req,res)=>{
  res.send("jay shree ram")
})

app.listen(3000,()=>{
    console.log('ram rma')
})