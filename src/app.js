const express = require('express');
const connDB = require('./config/database');
const User = require('./Models/user');
const app = express();//instance of an express.js application
app.use(express.json());

app.post("/signup",async (req,res) => {

    console.log(req.body);
    // Creating a new instance of the User Model
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User Added successfully");
    }catch(err){
        res.status(400).send("Error saving the user" + err.message);
    }
})


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