const router = require("express").Router();
const Post = require("../models/Post");

// create a post

router.post("/post", async (request, response) => {

    try {
        const newPost = new Post(request.body);
        const post = await newPost.save();
        response.status(200).json(post) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

// get a post

router.get("/:id", async (request, response) => {

    try {
        const post = await Post.findById(request.params.id);
        response.status(200).json(post) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

router.get("/", async (request, response) => {

    try {
        const posts = await Post.find({});
        response.status(200).json(posts) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

// get all posts

module.exports = router;