const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password:{
        type:String,
        required:true
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    phone_number:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:Number,
        default:'10' //patient = 10; nurse = 20;
    }
})

module.exports = User = mongoose.model('users', UserSchema)