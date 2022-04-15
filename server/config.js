const dotenv = require("dotenv");
const cfg = {};

if (process.env.NODE_ENV !== "test") {
    dotenv.config({
        path: "../.env"
    });
} else {
    dotenv.config({
        path: "../.env.example",
        silent: true
    });
}

// HTTP Port to run our web application
cfg.port = process.env.PORT || 5050;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
//
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;

cfg.twimlAppSid = process.env.TWILIO_TWIML_APP_SID;
cfg.callerId = process.env.TWILIO_CALLER_ID;

cfg.apiKey = process.env.TWILIO_API_KEY;
cfg.apiSecret = process.env.TWILIO_API_SECRET;

cfg.clientID = '306db99fcb85036c';
cfg.clientSecret = '2c2f4db20630fc1d0879aeaf2f0b21d566002d73';
cfg.callbackURL = 'https://f364-194-150-65-120.ngrok.io/auth/pipedrive/callback';

// Export configuration object
module.exports = cfg;