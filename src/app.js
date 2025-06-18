const express = require('express');

const app = express();//instance of an express.js application

app.get("/",(req, res) => { //request handler function
    res.send("Hello this is dashboard.");
});
app.get("/test",(req, res) => { //request handler function
    res.send("Hello from the server.");
});
app.get("/home",(req, res) => { //request handler function
    res.send("home home home.");
});
// app.use("/",(req, res) => { //request handler function
//     res.send("Hello this is dashboard.");
// });
// app.use("/test",(req, res) => { //request handler function
//     res.send("Hello from the server.");
// });
// app.use("/home",(req, res) => { //request handler function
//     res.send("home home home.");
// });

/*app.use("/"): matches all routes starting with /, including /test, /home, etc.
app.get("/"): only matches exact GET requests to /.*/


app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000......");
});
