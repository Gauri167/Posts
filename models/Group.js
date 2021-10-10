const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
        name : {
            type : String,
            require : true,
            unique : true 
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ]
    },
    { timestamps : true} 
);

module.exports = mongoose.model("Group", GroupSchema);