const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require('../Middlewares/auth');
const { validateEditProfileData,validatePasswordChange } = require('../utils/validation');
const bcrypt = require('bcrypt');


//GET user profile
profileRouter.get("/profile/view", userAuth, async(req,res) => {
    try{
        user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

//EDIT user profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Update not allowed");
        }
        const loggedInUser = req.user;
        
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile update successfully`,
            data: loggedInUser
        });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

//FORGOT password
profileRouter.patch("/profile/forgotPass", userAuth, async (req,res) => {
    try {
        const user = req.user;
        console.log("BODY: ",req.body);
        const newPassword = await validatePasswordChange(req.body, user);
        if(!newPassword){
            throw new Error("Password can't be changed");
        }

        user.password = await bcrypt.hash(newPassword,10);
        await user.save();
        res.send("Password changed successfully.");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = profileRouter;