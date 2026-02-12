const app = require ('./src/app')

const mongoose = require ('mongoose')

function connectToDb(){
    mongoose.connect("mongodb+srv://om:k0wIwvkLuzzkl0r2@cluster0.9lmvgkw.mongodb.net/day-6")

    .then(()=>{
        console.log("connected to database")
    })
}

connectToDb()

app.listen(3000 , ()=>{
    console.log("serever runnig on 3000 port")
})