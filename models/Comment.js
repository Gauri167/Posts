const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
        userId : {
            type : String,
            required : true 
        },
        postId : {
            type  : String,
            required : true
        },
        desc : {
            type : String,
            max : 100
        },
        depth : {
            type : int,
            required : true,
            default : 0
        }
    },
    { timestamps : true} 
);

module.exports = mongoose.model("Comment", CommentSchema);