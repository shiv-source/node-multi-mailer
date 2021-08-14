const sgMail = require("@sendgrid/mail");

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

   if(!html && !text ) { throw new Error('Please provide either text or html message') }
    console.log(message);

    await sendEmailViaSendGrid (message , this._sendGridApiKay);
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

    console.log(this);
    console.log(message);
    
    await sendEmailViaSendGrid (message , this._sendGridApiKay);
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
    message.html = html

    console.log(message);

    await sendEmailViaSendGrid (message , this._sendGridApiKay);
}


async function sendEmailViaSendGrid (msg , apiKey) {

    await sgMail.setApiKey(apiKey);

    console.log(this);
    await sgMail.send(msg)
    .then((res) => {return res;})
    .catch((err) => {console.log(err); return err});
} 

module.exports = new Mailer();