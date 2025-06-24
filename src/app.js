const express = require('express');

const app = express();//instance of an express.js application


app.get("/user/data", (req,res) => {
    //Logic of DB call and get user data
    
    throw new Error("hi how are you ");
    res.send("User Data sent");
});

app.use("/", (err,req,res,next) =>{
    if(err){
        //log your error response
        res.status(500).send("Something went wrong");
    }
});

app.listen(8080, () => {
    console.log("Server is successfully listening on port 8080......");
});
