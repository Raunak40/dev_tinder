const express = require('express');
const { adminAuth,userAuth } = require('./Middlewares/auth');
const app = express();//instance of an express.js application

//Handle Auth Middleware for all GET, POST ... requests
app.use("/admin", adminAuth);

app.post("/user/login", (req,res) => {
    res.send("Login Successful");
})

app.get("/user/data", userAuth, (req,res) => {
    res.send("All user data sent.");
})

app.get("/admin/getAllData", (req,res) => {
    res.send("All data sent successfully");
    console.log("all data sent");
});

app.get("/admin/deleteAllData", (req,res) => {
    res.send("All data deleted successfully");
    console.log("all data deleted");
});


app.listen(8080, () => {
    console.log("Server is successfully listening on port 8080......");
});
