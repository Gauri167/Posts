const router = require("express").Router();
const Comment = require("../models/Comment");

// create a post

router.post("/comment", async (request, response) => {

    try {
        const newComment = await new Comment({
            postId: request.body.postId,
            userId : request.body.userId,
            desc : request.body.desc,
            depth: request.body.depth
        });
        if(request.body.parentId != "")
            newComment.parentId = request.body.parentId;
        const comment = await newComment.save();
        response.status(200).json(comment) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

router.get("/comments/:id", async (request, response) => {

    try { 
        const comments = await Comment.find({postId : request.params.id});
        response.status(200).json(comments) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

// get all posts

module.exports = router;