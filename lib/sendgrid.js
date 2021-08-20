var sgMail = require("@sendgrid/mail");


var config = {};
var message = {};


var resolver = require("./resolver");

function SendGrid () {};


/**
 * 
 * @param {string} email - The email is the reciver email id.
 * @param {string} subject - The subject is the email subject for a particuar email.
 * @param {string} text - Text is the actual message (string) which is required to send an email.
 * @param {Array.<string>} attechments - attechments are the name of files in your attechment folder. [eg. myImage.png ] NOTE : It's an optional parameter.
 */

SendGrid.prototype.sendTextEmail = async function ( email , subject , text , attachments ) {

    config = global.multiMailerConfig;
    let error = new Error("sendgrid api key is missing");
    
    if(config._sendGridApiKey === ""){ 
        throw error;
    };
    message = {...await resolver.setMessage(email , subject)};

    message.text = text;

    if( attachments && attachments.length <= 0 ) {
        error.message = 'No files are selected as attachments';
        throw error;
    };

    if(attachments && attachments.length > 0 ) { 
        message.attachments = await resolver.getAttachments(attachments , config );
    };

    await sendEmailViaSendGrid(message , config._sendGridApiKey );
}


/**
 * 
 * @param {string} email - The email is the reciver email id.
 * @param {string} subject - The subject is the email subject for a particuar email.
 * @param {string} fileName - fileName is the template file name. eg. login.ejs
 * @param {object} data - data is actual data which can be bind in the template
 * @param {Array.<string>} attechments - attechments are the name of files in your attechment folder. [eg. myImage.png ] NOTE : It's an optional parameter. 
 */

SendGrid.prototype.sendEjsTemplateWithData = async function (  email , subject , fileName , data , attachments ) {

    config = global.multiMailerConfig;
    let error = new Error("sendgrid api key is missing");
    
    if(config._sendGridApiKey === ""){ 
        throw error;
    };
    message = {...await resolver.setMessage(email , subject)};

    message.html = await resolver.ejsTemplate( config, fileName , data );

    if( attachments && attachments.length <= 0 ) {
        error.message = 'No files are selected as attachments'; 
        throw error;
    };

    if(attachments && attachments.length > 0 ) { 
        message.attachments = await resolver.getAttachments(attachments , config );
    };

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
    .catch((err) => { console.log(err); return err});
}


/**
 * Export default SendGrid
 *
 * @api public
 */


module.exports = new SendGrid();