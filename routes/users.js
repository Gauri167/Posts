const router = require("express").Router();

router.get("/user", (request, response) => {
    response.send("Welcome");
});

module.exports = router;