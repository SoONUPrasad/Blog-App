const Comment = require("../models/comments.models");

const createComment = async (req, res) => {
    console.log(req.params.id);
    try {
        const newComment = await Comment.create({
            comment: req.body.comment,
            blogId: req.params.id,
            createdBy: req.user._id
        });
        res.status(201).redirect("/blogs/" + req.params.id);
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

const getComments = async (req, res) => {
    try {
        const blog = await Blog.findById({ _id: req.params.id });
        const comment = await Comment.find({ blogId: req.params.id });
        console.log(comment);
        res.status(200).render("blog", {
            title: "Blog",
            comments: comment,
            blogs: blog
        })
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}

module.exports = { createComment, getComments }