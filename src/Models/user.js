const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,

    },
    lastName: {
        type: String
    },
    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
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