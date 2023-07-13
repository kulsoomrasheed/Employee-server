const mongoose= require('mongoose')
const connection = mongoose.connect("mongodb://localhost:27017/mock5")
module.exports ={
    connection
}