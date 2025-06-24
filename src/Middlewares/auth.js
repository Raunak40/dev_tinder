const adminAuth = (req,res,next) => {
    console.log("Admin authorization is being checked");
    const token = "xyz";
    const isAdminAuthorised = token == "xyza";
    if(!isAdminAuthorised){
        res.status(401).send("Unauthorised Access");
        console.log("Unauthorised Access");
    }
    else{
        next();
    }
};

const userAuth = (req,res,next) => {
    console.log("User authorization is being checked");
    const token = "abc";
    const isUserAuthorised = token == "abccd";
    if(!isUserAuthorised){
        res.status(401).send("Unauthorised Access");
        console.log("Unauthorised Access");
    }
    else{
        next();
    }
};
module.exports = {
    adminAuth,
    userAuth,
};