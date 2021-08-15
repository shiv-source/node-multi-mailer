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
    sendGridApiKey : "PASTE_YOUR_SENDGRID_API_KEY",
    replyTo : "support@webizysolutions.com"   /// else default will be no-reply@webizysolutions.com
});

/// mailer configurations end /// 


/// Now you can use it any where inside you project ////

const userRoute = require("./router");
app.use("/" , userRoute);

/**
 * Open you browser and open 
 * 
 * http://localhost:3000/greetings
 * 
 *  You will get an email in your inbox
 * 
 */


const port = 3000;

app.listen(port , () => console.log(`Server is running on port : ${port}`));