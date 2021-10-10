const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        username : {
            type : String,
            require : true,
            unique : true 
        },
        email : {
            type : String,
            require : true,
            unique : true 
        },
        password : {
            type : String,
            require : true,
            min : 6
        },
        isAdmin : {
            type : Boolean,
            default : false
        },
        groups : [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Group' 
            }
        ]
    },
    { timestamps : true} 
);

module.exports = mongoose.model("User", UserSchema);