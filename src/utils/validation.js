const validator = require('validator');

const validateSignUpData = (req) => {
    let { firstName, lastName, emailID, password, age, gender, hobbies } = req.body;
    //Trim strings manually
    firstName = firstName.trim();
    lastName = lastName?.trim();
    emailID = emailID.trim().toLowerCase();
    password = password.trim();
    gender = gender?.trim().toLowerCase();
    
    if(!firstName || !lastName){
        throw new Error("First and Last Name is necessary")
    }
    else if(!validator.isEmail(emailID)){
        throw new Error("Email is invalid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Weak Password");
    }
}

module.exports = {
    validateSignUpData
};