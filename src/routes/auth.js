const express = require('express');
const authRouter = express.Router();
const User = require('../Models/user');
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');

//POST new users
authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);//Data Validation
        const { firstName, lastName, emailID, password, age, gender } = req.body;

        //Encrypting password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({ firstName, lastName, emailID, password: passwordHash, age, gender }); // Creating a new instance of the User Model
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

//LOGIN 
authRouter.post("/login", async (req, res) => {
    try {
        const { emailID, password } = req.body;

        const user = await User.findOne({ emailID: emailID });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            // Create a JWT Token
            const token = await user.getJWT()
            res.cookie("token",token, {expires: new Date(Date.now() + 1 * 3600000)});
            res.send("Logged in Successfully");
        }
        else {
            res.send("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = authRouter;