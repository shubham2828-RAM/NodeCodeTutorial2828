const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    userId:{
        type: String,
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema); //User is the name of the collection in the database where the user data will be stored.
module.exports = User;