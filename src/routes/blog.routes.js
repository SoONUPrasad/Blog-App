const express = require("express");
const multer = require("multer");
const path = require("path");
const { createBlog, getBlogs, getBlogId } = require("../controllers/blog.controller")
const { createComment, getComments } = require("../controllers/comments.controllers")
const { checkUser } = require("../middlewares/checkUser")

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.dirname("blog_app"), "public/uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })



router.get("/", getBlogs)
router.get("/:id", getBlogId)
router.post("/addblog",checkUser, upload.single("coverImg"), createBlog)
router.post("/:id/addComment",checkUser, createComment);
router.get("/:id/comments",getComments)
module.exports = router;