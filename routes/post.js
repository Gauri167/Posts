const router = require("express").Router();
const Post = require("../models/Post");
const AWS = require("aws-sdk");
const User = require("../models/User");
const Group = require("../models/Group");

// create a post

router.post("/post", async (request, response) => {

    try {
        
        var fileurl = "";

        const s3 = new AWS.S3({
            accessKeyId : process.env.aws_access_key_id, 
            secretAccessKey : process.env.aws_secret_access_key, 
            useAccelerateEndpoint: true
        });

        const params = {
            Bucket: process.env.s3bucketname,
            Key: 'posts/' + '', 
            Expires: 60 * 60, 
            ACL: 'bucket-owner-full-control'
        };

        s3.getSignedUrl('putObject', params, function (err, url){
            if(err){
                console.log('Error getting presigned url from AWS S3');
                res.json({ success : false, message : 'Pre-Signed URL error', urls : fileurls});
            }
            else{
                fileurl = url;
                console.log('Presigned URL: ', fileurl);
                res.json({ success : true, message : 'AWS SDK S3 Pre-signed urls generated successfully.', urls : fileurl});
            }
        });

        const newPost = await new Post({
            userId : request.body.userId,
            desc : request.body.desc,
            img : fileurl
        });
        const post = await newPost.save();
        response.status(200).json(post) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});


//Like/Dislike a post
router.get("/:id/like", async (request, response) => {

    try {
        const post = await Post.findById(request.params.id);
        if(!post.likes.include(request.body.userId))
        {
            await post.updateOne({ $push : {likes : request.body.userId}});
            response.status(200).json("Post is liked") ;
        } else {
            await post.updateOne({ $pull : {likes : request.body.userId}});
            response.status(200).json("Post is disliked") ;
        }
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

//get timeline posts

router.get("/timeline/all", async (request, response) => {
    let posts = [];
    try {
        const user =  await User.findById(request.body.userId).populate('groups');

        const friensPosts =  await Promise.all(
            user.groups.map( (groups) => {
                groups.users.map((usr) => {
                    Post.find({userId : usr._id}, (error, data) => { 
                        if(error)
                            console.log("error" + error)
                        else
                        {
                            console.log(data);
                            posts.push(data)
                        }
                    })
                })
            })
        );
        response.status(200).json(posts) ;
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

module.exports = router;