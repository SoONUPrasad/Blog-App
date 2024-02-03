const User = require("../models/user.models");

async function createUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email, 
            password 
        });
        res.status(201).redirect("/login");
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const token = await User.matchUser(email, password);
        // console.log("user:" + token);
        res.cookie("token", token).redirect("/");
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
}

async function logoutUser(req, res) {
    res.clearCookie("token").redirect("/login");
}


module.exports = {
    createUser,
    loginUser,
    logoutUser
}