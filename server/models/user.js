const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    //server-side-scripting
    name:{
        type:String,
        require:[true,"name is req"]
    },
    email:{
        type:String,
        require:[true,"name is req"]
    },
    password:{
        type:String,
        require:[true,"name is req"]
    },
    image:String,
    role:{ //access control
        type:String,
        default:"user"
    }
},{timestamps:true}) //to-maintain-users-timestamps
const User = mongoose.model('users', userSchema)
module.exports = User