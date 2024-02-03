const express = require("express");
const { createUser, loginUser, logoutUser } = require("../controllers/user.controllers")

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Log In"
    })
})

router.post("/signup", createUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)






module.exports = router