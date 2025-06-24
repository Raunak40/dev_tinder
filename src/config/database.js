    const mongoose = require("mongoose");

    const connDB = async () => {
        await mongoose.connect("mongodb+srv://namasteNode:FmHcU5IarIfD59n7@namastedev1.rsknemm.mongodb.net/devTinder");
    };

    module.exports = connDB;