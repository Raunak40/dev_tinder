const express = require('express');
const profileRouter = express.Router();
const bcrypt = require('bcrypt');
const { userAuth } = require('../Middlewares/auth');


//GET user profile
profileRouter.get("/profile", userAuth, async(req,res) => {
    try{
        user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

//Update data of the user by userID
profileRouter.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["photoURL", "about", "gender", "age", "hobbies", "password",];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        //Ensures hobbies are unique
        if (Array.isArray(data.hobbies)) {
            data.hobbies = [...new Set(data.hobbies.map(h => h.trim().toLowerCase()))];
            if (data.hobbies.length > 10) {
                throw new Error("Hobbies cannot be more than 10");
            }
        }

        if(data.password){
            data.password = await bcrypt.hash(data.password, 10);
        }

        const result = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        });
        if (!result) {
            return res.status(404).send("User not found");
        }
        res.send("User updatedd successfully");
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

//Update data of the user by email
// profileRouter.patch("/user", async (req, res) => {
//     const userEmail = req.body.emailID;
//     const data = req.body;

//     try {
//         await User.findOneAndUpdate(
//             { emailID: userEmail },
//             { $set: data },
//             { runValidators: true },
//         );
//         res.send("User updatedd successfully");
//     }
//     catch (err) {
//         res.status(400).send("UPDATE FAILED: " + err.message);
//     }
// })


module.exports = profileRouter;