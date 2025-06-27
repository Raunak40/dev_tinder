const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../Middlewares/auth');

requestRouter.post("/sendConnReq",userAuth, async (req,res) => {
    try{
        console.log("Connection request sent successfully");
        user = req.user;
        res.send(user.firstName + " Sent connection request");
    }catch(err){
        res.status(400).send("ERROR: "+ err.message);
    }
})

module.exports = requestRouter;