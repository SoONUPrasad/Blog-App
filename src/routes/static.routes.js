const express = require("express");
const { checkUser } = require("../middlewares/checkUser")
const { createBlog, getBlogs } = require("../controllers/blog.controller")

const router = express.Router();

// router.get("/",checkUser, (req, res) => {
//     res.render("home", {
//         title: "Home"
//     })
// })

router.get("/",checkUser, getBlogs)


router.get("/addblog",checkUser, (req, res) => {
    res.render("addBlog", {
        title: "Add Blog"
    })
})

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Log In"
    })
})

router.get("/signup", (req, res) => {
    res.render("signup", {
        title: "Register"
    })
})







module.exports = router