var path = require("path");
var fs = require("fs");
var obj = {};

var defaultTemplateDir = path.join( __dirname , '../../email' );
var defaultAttachmentDir = path.join( __dirname , '../../attachments');

function MultiMailerConfig () {};


/**
 * Assign the configuration to an mailer.
 * @param {Object} config - The config who is responsible for setting up essential requirements to send email.
 * @param {string} config.senderEmail - The senderEmail is the email id through which you want to send email.
 * @param {string} config.senderName - The senderName is the NAME which will be viewed by the reciver in the inbox.
 * @param {string} config.replyTo - The replyTo is the Email id where you want to get your email response , default is your sender email,
 * @param {string} config.sendGridApiKey - This sendGridApiKey is provided by sendgrid.com for your verified sender email id
 * @param {string} config.templateFolderPath - This is the base folder path of email template default is 'email'
 * @param {string} config.attachmentFolderPath - This is the base folder path of email template default is 'email'
 */



MultiMailerConfig.prototype.setConfig = async function(config){

    // common configuraion
    obj._senderEmail = config.senderEmail;
    obj._senderName = config.senderName;
    obj._replyTo = config.replyTo || config.senderEmail;

    // sendgrid configuraion
    obj._sendGridApiKey = config.sendGridApiKey || "";
    // template folder configuraion
    obj._templateFolderPath = config.templateFolderPath || defaultTemplateDir ;
    obj._attachmentFolderPath = config.attachmentFolderPath || defaultAttachmentDir;
    global.multiMailerConfig = obj;

    if(!config.templateFolderPath){
        fs.exists(defaultTemplateDir , (exists) => {
            if(exists){return }
            else { fs.mkdirSync(defaultTemplateDir , { recursive : true})};
        }); 
    }

    if(!config.attachmentFolderPath){
        fs.exists( defaultAttachmentDir , (exists) => {
            if(exists){return }
            else {fs.mkdirSync(defaultAttachmentDir , { recursive : true})};
        });
    }
     
}



/**
 * Export default config.
 *
 * @api public
 */

module.exports = new MultiMailerConfig();