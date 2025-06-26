const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail'); //can be used to validate a lot of fields

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
        validate: [isEmail, 'Please fill a valid email address'],
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.length < 8){
                throw new Error("Password must be at least 8 characters");
            }
            if(!/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)){
                throw new Error("Password must contain at least one uppercase letter,one number and one special character");
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
    hobbies: {
        type: [String],
    }
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);//MODEL

module.exports = User;