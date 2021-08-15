const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multiMailer = require("node-multi-mailer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : false }));
app.use(bodyParser.json());

/// multiMailer configurations start /// 
// multiMailer.configuration({
//     senderEmail : "no-reply@webizysolutions.com",
//     senderName : "Webizy IT Solutions",
//     sendGridApiKay : "PASTE_YOUR_SENDGRID_API_KEY",
//     replyTo : "support@webizysolutions.com"   /// else default will be no-reply@webizysolutions.com
// });




/////// For example sending email template with data //////

let emailFolder = path.join( __dirname , 'email');

multiMailer.configuration({
    senderEmail :"no-reply@webizysolutions.com",
    senderName : "Webizy IT Solutions",
    sendGridApiKay :  "PASTE_YOUR_SENDGRID_API_KEY",
    replyTo : "support@webizysolutions.com",  /// else default will be no-reply@webizysolutions.com
    templateFolderPath : emailFolder
});

/// mailer configurations end /// 

console.log(emailFolder);
/// Now you can use it any where inside you project ////

app.get("/" , async (req , res ,next ) => {

    await multiMailer.sendTextEmail('developer.shiv2020@gmail.com' , ' my subject testing ' , 'Thanks for sending email with node-multi-mailer');

    return res.status("All Works !!!");
});


app.get("/example2" , async (req  ,res ) => {
   
    let data = {
        firstName : "shiv",
        lastName : "kumar"
    }

    await multiMailer.sendEjsTemplateWithData( 'developer.shiv2020@gmail.com' , 'Tesing of template' , 'login.ejs' , data );
    
    return res.send("Email sent to your template with the value bind with 'data' object ");
});


/**
 * Open you browser and open 
 * 
 * http://localhost:3000/
 * 
 *  You will get an email in your inbox
 * 
 */


const port = 3000;

app.listen(port , () => console.log(`Server is running on port : ${port}`));