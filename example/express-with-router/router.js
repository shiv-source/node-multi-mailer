const express = require("express");
const multiMailer = require("node-multi-mailer");


const router = express.Router();

router.get("/greetings" , async(req , res ) => {

    /// ............do your stuffs 

    /// Email will be send here /////
    await multiMailer.sendTextEmail('developer.shiv2020@gmail.com' , ' my subject testing ' , 'Thanks for sending email with node-multi-mailer');
    
    /// ..........do your stuffs 
    return res.send("All works !! , Email sent successfully.") 
})

module.exports = router;