const router = require("express").Router();
const User = require("../models/User");
const Group = require("../models/Group");

//REGISTER
router.get("/:id", async (request, response) => {
    
    try {
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
});

router.post("/follow", async (request, response) => {
    
    try {
        const group = await Group.findById(request.body.groupId);
        const user = await User.findByIdAndUpdate(
                                request.body.userId,
                                { $push : {groups : group._id}}, 
                                { new: true, useFindAndModify: false }
                            );
        await group.updateOne({ $push : {users : user._id}}, { new: true, useFindAndModify: false })
        
        response.status(200).json("Added to group");
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});


router.post("/unfollow", async (request, response) => {
    
    try {
        const group = await Group.findById(request.body.groupId);
        const user = await User.findByIdAndUpdate(
                                request.body.userId,
                                { $pull : {groups : group._id}}, 
                                { new: true, useFindAndModify: false }
                            );
        await group.updateOne({ $pull : {users : user._id}}, { new: true, useFindAndModify: false })
        
        response.status(200).json("Added to group");
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});



module.exports = router;