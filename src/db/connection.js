const mongoose = require("mongoose");

async function connectDB() {
    try {
       const connectionInstance = await mongoose.connect("mongodb://127.0.0.1:27017/blog_app");
        console.log("connection is established:",connectionInstance.connection.name);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;