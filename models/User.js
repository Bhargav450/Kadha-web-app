const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    email:{
      type: String,
      required:true  
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:false,
        default: ""
    },
    address:{
        type:String,
        required:false,
        default: ""
    },
    image:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('User',Userschema);