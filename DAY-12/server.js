const app = require("./src/routes/app")

const connectToDb = require ('./src/config/database')

require("dotenv").config()


connectToDb();



app.listen(3000 , ()=>{
    console.log("server is running on 3000")
}
)