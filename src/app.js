const express = require('express');
const cookieParser  = require("cookie-parser");
const connDB = require('./config/database');
const app = express();//instance of an express.js application

app.use(express.json());//Returns middleware that only parses json
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);


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