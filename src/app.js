const express = require('express');

const app = express();//instance of an express.js application

//app.use("/user",rH1,[rH2,rH3,rH4,],rH5);

app.use(
    "/user", 
    (req,res,next) => {// Middleware
        console.log("First Request Handled");
        // res.send("1st Response");   
        next(); // calls next Middleware in the stack
    },
    [
        (req,res,next) => {// Middleware
            console.log("Second Request Handled");  
            // res.send("2nd Response");   
            next();
        },
        (req,res,next) => {// Middleware
            console.log("Third Request Handled");    
            // res.send("3rd Response");   
            next();
        },
        (req,res,next) => {// Middleware
            console.log("Forth Request Handled");    
            // res.send("4th Response");   
            next();
        },
    ],
    (req,res) => { //REAL Request Handler
        console.log("Fifth Request Handled");    
        res.send("5th Response");   
    }
);
app.listen(8080, () => {
    console.log("Server is successfully listening on port 8080......");
});
