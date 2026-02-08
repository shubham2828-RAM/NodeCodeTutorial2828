const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        // unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
    jobTitle:{
        type:String,
        required:true,
    }

},{timestamps:true,},
{ versionKey:false}

);

exports.user = userSchema;

