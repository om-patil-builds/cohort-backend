const mongoose = require ('mongoose')


function connectToDb (){
    mongoose.connect('mongodb+srv://ompatil:kKPdfg3034gh0euS@cluster3.bbswpgj.mongodb.net/DAY-7')
    .then(()=>{
        console.log('database connected successfully')
    })
}


module.exports = connectToDb

kKPdfg3034gh0euS


