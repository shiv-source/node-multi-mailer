var config = require("./config");
var SendGrid = require("./sendgrid");


module.exports = {
    configuration : config.setConfig,
    SendGrid,
}