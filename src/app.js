const express = require('express');

const app = express();//instance of an express.js application

app.use("/user",(req, res) => { //request handler function
    res.send("HaHaHaHa");
});
app.get("/user",(req, res) => { 
    res.send({firstname: "Raunak", lastname: "Razz"});
});
app.post("/user",(req, res) => { 
    res.send("Data Saved Successfully.");
});
app.delete("/user",(req, res) => { 
    res.send("Data Deleted.");
});

app.get("/",(req, res) => { 
    res.send("Hello this is dashboard.");
});
app.get("/test",(req, res) => { //request handler function
    res.send("Hello from the server.");
});
app.get("/home",(req, res) => { //request handler function
    res.send("home home home.");
});
// app.use("/test",(req, res) => { //request handler function
//     res.send("Hello from the server.");

/*
=> app.use("/"): matches all routes starting with /, including /test, /home, etc. and will also match all the HTTP method API to /test,/home,etc.
=> app.get("/"): only matches exact GET requests to / and will only handle GET calls to /
*/

app.listen(8080, () => {
    console.log("Server is successfully listening on port 8080......");
});
