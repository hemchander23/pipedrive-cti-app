const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

//Pipedrive OAuth
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

const api = require('./api');
const config = require('./config');
const User = require('./db/user');

User.createTable();

const router = require("./router");
// PD OAuth
passport.use(
    'pipedrive',
    new OAuth2Strategy({
        authorizationURL: 'https://oauth.pipedrive.com/oauth/authorize',
        tokenURL: 'https://oauth.pipedrive.com/oauth/token',
        clientID: config.clientID || '',
        clientSecret: config.clientSecret || '',
        callbackURL: config.callbackURL || ''
    }, async (accessToken, refreshToken, profile, done) => {
        const userInfo = await api.getUser(accessToken);
        const user = await User.add(
            userInfo.data.name,
            accessToken,
            refreshToken
        );

        done(null, {
            user
        });
    })
);


// Create Express webapp
const app = express();
app.use(passport.initialize());
app.use(async (req, res, next) => {
    req.user = await User.getById(1);
    next();
});
app.get('/auth/pipedrive', passport.authenticate('pipedrive'));
app.get('/auth/pipedrive/callback', passport.authenticate('pipedrive', {
    session: false,
    failureRedirect: '/',
    successRedirect: '/'
}));
// app.get('*', async (req, res) => {
//     res.redirect('/');
// });

app.use((req, res, next) => {
    if (req.user.length < 1) {
        return res.redirect('/auth/pipedrive');
    } else {
        console.log(req.user);
        next();
    }
});

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(router);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 5050;

server.listen(port, function () {
    console.log("Express server running on *:" + port);
});