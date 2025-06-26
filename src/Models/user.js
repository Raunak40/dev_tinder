const mongoose = require('mongoose');
const validator = require('validator'); //can be used to validate a lot of fields

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
        match: /^[A-Za-z\s]+$/,

    },
    lastName: { 
        type: String,
        match: /^[A-Za-z\s]+$/,
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please fill a valid email address");
            }
        },
        //match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak Password");
            }
        }
    },
    age: {
        type: Number,
        min: 18, 
    },
    gender: {
        type: String,
        trim: true,
        validate(value){//only works for new object by default
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoURL: {
        type: String,
        default: "https://www.istockphoto.com/illustrations/user-profile",
    },
    about: {
        type: String,
        default: "This is a default user about",
    },
    hobbies: [{
        type: String,
    }]
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);//MODEL

module.exports = User;