const Blog = require("../models/blog.models");
const Comment = require("../models/comments.models");
async function createBlog(req, res) {
    const { title, description, author } = req.body;
    console.log(req.file);
    console.log(req.user);
    try {
        const blog = await Blog.create({
            title,
            description,
            author,
            coverImg: `/public/uploads/1706697018441pxfuel.jpg`,
            createdBy: req.user._id
        })
        res.status(201).redirect("/");
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

async function getBlogs(req, res) {
    try {
        const blog = await Blog.find({});
        res.status(200).render("home", {
            title: "Home",
            blogs: blog
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

async function getBlogId(req, res) {
    try {
        const blog = await Blog.findById({ _id: req.params.id });
        const comments = await Comment.find({});
        res.status(200).render("blog", {
            title: blog.title,
            blogs: blog,
            comments: comments
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

module.exports = { createBlog, getBlogs, getBlogId }