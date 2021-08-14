const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multiMailer = require("node-multi-mailer");


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : false }));
app.use(bodyParser.json());

/// multiMailer configurations start /// 
multiMailer.configuration({
    senderEmail : "no-reply@webizysolutions.com",
    senderName : "Webizy IT Solutions",
    sendGridApiKay : "PASTE_YOUR_SENDGRID_API_KEY",
    replyTo : "support@webizysolutions.com"   /// else default will be no-reply@webizysolutions.com
});

/// mailer configurations end /// 


/// Now you can use it any where inside you project ////

app.get("/" , async (req , res ,next ) => {

    await multiMailer.sendTextEmail('developer.shiv2020@gmail.com' , ' my subject testing ' , 'Thanks for sending email with node-multi-mailer');

    return res.status("All Works !!!");
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