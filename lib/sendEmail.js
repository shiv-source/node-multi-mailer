const sgMail = require("@sendgrid/mail");
const ejs = require("ejs");
const resolver = require("./resolver");

var message = {};

function Mailer () {};

/**
 * 
 * @param {string} email - The email is the reciver email id
 * @param {string} subject - The subject is the email subject for a particuar email
 * @param {string} text - Text is the actual message (string) which is required to send an email
 * @param {string} html - HTML is the actual message (in HTML format ) which is required to send an email
 */

Mailer.prototype.sendEmail = async function( email , subject , text , html ) {

    message.from = `${this._senderName} <${this._senderEmail}>`;
    message.replyTo = this._replyTo;
    message.to = email;
    message.subject = subject;
    message.text = text || '';
    message.html = html || '';

   if(!html && !text ) { throw new Error('Please provide either text or html message') };

    await sendEmailViaSendGrid (message , this._sendGridApiKey);
}



/**
 * 
 * @param {string} email - The email is the reciver email id
 * @param {string} subject - The subject is the email subject for a particuar email
 * @param {string} text - Text is the actual message (string) which is required to send an email
 */

Mailer.prototype.sendTextEmail = async function( email , subject , text ) {

    message.from = `${this._senderName} <${this._senderEmail}>`;
    message.replyTo = this._replyTo;
    message.to = email;
    message.subject = subject;
    message.text = text;

    await sendEmailViaSendGrid (message , this._sendGridApiKey);
}



/**
 * 
 * @param {string} email - The email is the reciver email id
 * @param {string} subject - The subject is the email subject for a particuar email
 * @param {string} html - HTML is the actual message (in HTML format ) which is required to send an email
 */

Mailer.prototype.sendHtmlEmail = async function( email , subject , html ) {
    
    message.from = `${this._senderName} <${this._senderEmail}>`;
    message.replyTo = this._replyTo;
    message.to = email;
    message.subject = subject;
    message.html = html;

    await sendEmailViaSendGrid (message , this._sendGridApiKey);
}


/**
 * 
 * @param {string} email - The email is the reciver email id
 * @param {string} subject - The subject is the email subject for a particuar email
 * @param {string} fileName -  The fileName is the name of ejs template; eg. signupOtp.ejs
 * @param {object} data  - The data is an object which key-value pair will be directly used in selected ejs file  and bind the data in ejs.
 */

Mailer.prototype.sendEjsTemplateWithData = async function ( email , subject , fileName , data ) {

    let templatePath = await resolver.getPath( this._templateFolderPath  , fileName);

    let html = await ejs.renderFile( templatePath , data );

    message.from = `${this._senderName} <${this._senderEmail}>`;
    message.replyTo = this._replyTo;
    message.to = email;
    message.subject = subject;
    message.html = html;

    await sendEmailViaSendGrid (message , this._sendGridApiKey);
} 


async function sendEmailViaSendGrid (msg , apiKey) {

    await sgMail.setApiKey(apiKey);

    await sgMail.send(msg)
    .then((res) => {return res;})
    .catch((err) => {console.log(err); return err});
} 

module.exports = new Mailer();