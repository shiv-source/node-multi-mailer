var multiMailer = require("node-multi-mailer"); // require node-multi-mailer package from your local node_modules folder
var path = require("path");  // require path package from default of node js


/**
 * @default multiMailer is a promise based library. You can also use it with async/ await.
 * 
 */

// Set target folder path  for email and attachment //
var attachmentFolder = path.join( __dirname , 'attachment' );  // attachment folder path
var emailFolder = path.join(__dirname, "email");  // email folder path


// sendgrid api key
var SENDGRID_API_KEY = YOUR_SENDGRID_API_KEY;


/**
 * Multimailer configuration
 * 
 * @default multiMailer.configuration should be on the top. befor sending / calling any other class or function of multiMailer.
 */

multiMailer.configuration({
    senderEmail: "you@example.com",
    senderName: 'your business name', // Business Name
    sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
    replyTo: "me@example.com",        // optional parameter [ default = senderEmail ]
    templateFolderPath : emailFolder,   // optional parameter  [ required for sending templates ]
    attachmentFolderPath : attachmentFolder,  // Optional parameter  [ required for sending attachments]
    
});



// example - 1  SEND A PLAIN TEXT EMAIL //

multiMailer.SendGrid.sendTextEmail(
  "developer.shiv2020@gmail.com",  // reciver email
  "Sending email from node-multi-mailer", // subject 
  "Thanks for sending email with node-multi-mailer" // body
);





// example - 2  SEND A PLAIN TEXT EMAIL WITH ATTACHMENTS //


let attachments = ['myImage.png' , 'resume.pdf' , 'resume.docx' ];  // pass list of files you want to send with multiMailer


multiMailer.SendGrid.sendTextEmail(
  "developer.shiv2020@gmail.com",  // reciver email
  "Sending email from node-multi-mailer", // subject 
  "Thanks for sending email with node-multi-mailer", // body,
  attachments,
);



// example - 3  SEND AN EJS TEMPLATE WITH DATA //

// Data object which can be passed to the template [login.ejs]
var data = {
  firstName: "Shiv",
  lastName: "Kumar",
  otp: "123456",
};


/**
 * @description
 * 
 * <!DOCTYPE html>
 * <html lang="en">
 * <head>
 * <meta charset="UTF-8" />
 * <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 * <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 *  <title>Node-Multi-Mailer</title>
 * </head>
 *
 * <body>
 * <h1>Hey <%= firstName %> <%= lastName %>, Your OTP is <%= otp %></h1>
 * </body>
 * </html>
 * 
 * 
 */

multiMailer.SendGrid.sendEjsTemplateWithData(
  "developer.shiv2020@gmail.com",           // reciver email
  "Sending email from node-multi-mailer",   // subject 
  'login.ejs',                              // login.ejs is the target template
  data,                                     // data which you can directly bind with templates [login.ejs]
)







// example - 4  SEND AN EJS TEMPLATE WITH DATA AND ATTACHMENTS //

let attachments = ['myImage.png' , 'resume.pdf' , 'resume.docx' ];  // pass list of files you want to send with multiMailer



// Data object which can be passed to the template [login.ejs]
var data = {
  firstName: "Shiv",
  lastName: "Kumar",
  otp: "123456",
};


/**
 * @description
 * 
 * <!DOCTYPE html>
 * <html lang="en">
 * <head>
 * <meta charset="UTF-8" />
 * <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 * <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 *  <title>Node-Multi-Mailer</title>
 * </head>
 *
 * <body>
 * <h1>Hey <%= firstName %> <%= lastName %>, Your OTP is <%= otp %></h1>
 * </body>
 * </html>
 * 
 * 
 */

multiMailer.SendGrid.sendEjsTemplateWithData(
  "developer.shiv2020@gmail.com",           // reciver email
  "Sending email from node-multi-mailer",   // subject 
  'login.ejs',                              // login.ejs is the target template
  data,                                     // data which you can directly bind with templates [login.ejs]
  attachments                               // optional parameter  [ required for sending list of files ]
);
