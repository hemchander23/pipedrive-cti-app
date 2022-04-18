const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const twilio_router = require("./routers/twilio");
const pipedrive_router = require("./routers/pipedrive");

// Create Express webapp
// Add Pipedrive OAuth callback & API routes
const app = express();
app.use(pipedrive_router);

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
// Add Twilio routes
app.use(twilio_router);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 5050;

server.listen(port, function () {
    console.log("CTI App Server running on *:" + port);
});