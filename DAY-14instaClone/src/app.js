const express = require ('express')
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth.routes")
const postRouter = require ("./routes/post.routes")


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRouter)
app.use("/api/posts" , postRouter)

module.exports = app


//Multer - is package which give a power to the express server which is the file can not read by default by express server that file we can read by using mullter

