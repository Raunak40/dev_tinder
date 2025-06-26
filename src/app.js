const express = require('express');
const connDB = require('./config/database');
const User = require('./Models/user');
const app = express();//instance of an express.js application
app.use(express.json());//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

//POST new users
app.post("/signup", async (req, res) => {
    try {
        let { firstName, lastName, emailID, password, age, gender, hobbies } = req.body;
        //Trim strings manually
        firstName = firstName.trim();
        lastName = lastName?.trim();
        emailID = emailID.trim().toLowerCase();
        password = password.trim();
        gender = gender?.trim().toLowerCase();
        
        const user = new User(req.body); // Creating a new instance of the User Model
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
})

//GET user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailID;
    try {
        const user = await User.find({ emailID: userEmail });
        if (user.length == 0) {
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//Delete a user from the database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }
    catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//Update data of the user by userID
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["photoURL", "about", "gender", "age", "hobbies", "password",];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed");
        }
        //Ensures hobbies are unique
        if (data.hobbies && Array.isArray(data.hobbies)) {
            data.hobbies = [...new Set(data.hobbies)];
        }
        if (data?.hobbies.length > 10) {
            throw new Error("Skills cannot be more than 10");
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
// app.patch("/user", async (req, res) => {
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

connDB()
    .then(() => {
        console.log("Database connection established....");
        app.listen(8080, () => {
            console.log("Server is successfully listening on port 8080......");
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected!!");
    })






//mongodb+srv://namasteNode:FmHcU5IarIfD59n7@namastedev1.rsknemm.mongodb.net/