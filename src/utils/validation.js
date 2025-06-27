const validator = require('validator');
const bcrypt = require('bcrypt');


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

const validateEditProfileData = (req) => {
    const allowedEdits = ["firstName","lastName","photoURL", "about", "gender", "age", "hobbies"];
    const isEditAllowed = Object.keys(req.body).every((field) => allowedEdits.includes(field));
    return isEditAllowed;
}

const validatePasswordChange = async (body, user) =>{
    const {currentPassword, newPassword } = body;
    if(!currentPassword || !newPassword ){
        throw new Error("Both current and new password are required.");
    }
    const isMatched =  await user.validatePassword(currentPassword);
    if(!isMatched){
        throw new Error("Current password is incorrect");
    }
    if (await bcrypt.compare(newPassword, user.password)) {
      throw new Error("New password must be different from the current password");
    }
    if(!validator.isStrongPassword(newPassword)){
        throw new Error("Weak Password");
    }
    return newPassword;

}
module.exports = {
    validateSignUpData,
    validateEditProfileData,
    validatePasswordChange
};