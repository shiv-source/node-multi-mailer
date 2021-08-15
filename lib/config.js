const path = require("path");

function EmailConfig () {};

/**
 * Assign the configuration to an mailer.
 * @param {Object} config - The config who is responsible for setting up essential requirements to send email.
 * @param {string} config.senderEmail - The senderEmail is the email id through which you want to send email.
 * @param {string} config.senderName - The senderName is the NAME which will be viewed by the reciver in the inbox.
 * @param {string} config.replyTo - The replyTo is the Email id where you want to get your email response , default is your sender email,
 * @param {string} config.sendGridApiKey - This sendGridApiKey is provided by sendgrid.com for your verified sender email id
 * @param {string} config.templateFolderPath - This is the base folder path of email template default is 'email'
 */

EmailConfig.prototype.setData = async function (config) {
    this._senderEmail = config.senderEmail;
    this._senderName = config.senderName;
    this._sendGridApiKey = config.sendGridApiKey;
    this._replyTo = config.replyTo || config.senderEmail,
    this._templateFolderPath = config.templateFolderPath || path.join( __dirname , '../email' )

    return this;
}

/**
 * Export default config.
 *
 * @api public
 */


module.exports = new EmailConfig();