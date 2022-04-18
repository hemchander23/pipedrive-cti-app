const Router = require("express").Router;
const {
    tokenGenerator,
    voiceResponse
} = require("../utils/twilio_handler");

const router = new Router();

router.get("/token", (req, res) => {
    res.send(tokenGenerator());
});
// Incoming voice call
router.post("/voice", (req, res) => {
    res.set("Content-Type", "text/xml");
    res.send(voiceResponse(req.body));
});

module.exports = router;