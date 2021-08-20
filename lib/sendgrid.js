var sgMail = require("@sendgrid/mail");
var ejs = require("ejs");

var config = {};
var message = {};


var resolver = require("./resolver");

function SendGrid () {};


/**
 * 
 * @param {string} email - The email is the reciver email id.
 * @param {string} subject - The subject is the email subject for a particuar email.
 * @param {string} text - Text is the actual message (string) which is required to send an email.
 * @param {Array.<string>} attechments - attechments are the path of the attachments folder. NOTE : It's an optional parameter. 
 */

SendGrid.prototype.sendTextEmail = async function ( email , subject , text , attachments ) {

    config = global.multiMailerConfig;
    if(config._sendGridApiKey === ""){ throw new Error("sendgrid api key is missing")};

    message = {...await resolver.setMessage(email , subject)};
    message.text = text;

    if( attachments && attachments.length <= 0 ) { throw new Error ('No files are selected as attachments') };

    if(attachments && attachments.length > 0 ) { 
        message.attachments = await resolver.getAttachments(attachments , config );
    };

    //console.log(message);

   await sendEmailViaSendGrid(message , config._sendGridApiKey );
} 


/**
 * 
 * @param {object} msg - msg is the actual message object
 * @param {string} apiKey - The apiKey is sendgrid api key.
 * @returns res
 */

async function sendEmailViaSendGrid (msg , apiKey) {

    await sgMail.setApiKey(apiKey);

    await sgMail.send(msg)
    .then((res) => { return res;})
    .catch((err) => {console.log(err); return err});
}


module.exports = new SendGrid();