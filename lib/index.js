var config = require("./config");
var sendGrid = require("./sendgrid");


module.exports = {
    configuration : config.setConfig,
    SendGrid : sendGrid,
}