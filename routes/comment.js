const router = require("express").Router();
const Comment = require("../models/Comment");

// create a post

router.post("/comment", async (request, response) => {

    try {
        const newComment = new Comment(request.body);
        const comment = await newComment.save();
        response.status(200).json(comment) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

router.get("/comments", async (request, response) => {

    try { 
        const comments = await Comment.find({});
        response.status(200).json(comments) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

// get all posts

module.exports = router;