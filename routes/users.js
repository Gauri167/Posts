const router = require("express").Router();
const User = require("../models/User");

//REGISTER
router.get("/:id", async (request, response) => {
    
    try {
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;