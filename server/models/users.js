const mongoose = require('mongoose')
const UserSchema= new mongoose.Schema({
    name:String,
    description:String,
    date:String
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel