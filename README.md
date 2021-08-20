# node-multi-mailer

![NPM Version](https://img.shields.io/npm/v/node-multi-mailer.svg?style=flat)
![NPM Downloads](https://img.shields.io/npm/dm/node-multi-mailer.svg)
![GitHub release](https://img.shields.io/github/release/shiv-source/node-multi-mailer)
![License](https://img.shields.io/github/license/shiv-source/node-multi-mailer)

A simple node.js module that exposes high-level API of [Nodemailer](https://www.npmjs.com/package/nodemailer) and [SendGrid](https://www.npmjs.com/package/@sendgrid/mail).

# Installation

## Prerequisites

- Node.js >= 10.0.0
- A [Twilio SendGrid account](https://sendgrid.com/free?source=sendgrid-nodejs) for sending emails.

## Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x, therefore, you likely already have it.

```sh

# With NPM

npm install --save node-multi-mailer

# With Yarn

yarn add node-multi-mailer

```

### Verify Sender Identity from SendGrid

Verify an email address or domain in the [Sender Authentication tab](https://app.sendgrid.com/settings/sender_auth/senders). Without this, you will receive a `403 Forbidden` response when trying to send mail.

# Examples

If you want to use an email template, then add an `email` folder in your project root directory and create a `login.ejs` file in the `email` folder. You can use any template name you want.

Add `attachment` folder in your root directory for sending an email with attachments.

```
Folder structure with mail template:

    +-- email
    |   +-- login.ejs
    +-- attachments
    |   +-- myImage.png
    |   +-- resume.pdf
    |   +-- resume.docx
    +-- node_modules
    +-- index.js
    +-- package.json
```

If required, use this `login.ejs` file as an example template.

```html
<!-- login.ejs -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Node-Multi-Mailer</title>
  </head>

  <body>
    <h1>Hey <%= firstName %> <%= lastName %>, Your OTP is <%= otp %></h1>
  </body>
</html>
```

## Implementation with NodeJs and SendGrid

```js
// Available options inside configuration object

const multiMailer = require("node-multi-mailer");

const multiMailer = multiMailer.configuration({
  senderEmail: "you@example.com",
  senderName: "your business name", // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "me@example.com", // optional parameter [ default = senderEmail ]
  templateFolderPath: emailFolder, // optional parameter  [ required for sending templates ]
  attachmentFolderPath: attachmentFolder, // Optional parameter  [ required for sending attachments]
});
```

### A normal plain text email without any attachments

```js
// index.js

var multiMailer = require("node-multi-mailer");

// Create a new instance of MultiMailer
multiMailer.configuration({
  senderEmail: "you@example.com",
  senderName: "your business name", // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "me@example.com", // optional parameter [ default = senderEmail ]
});

var RECEIVER_EMAIL = "developer.shiv2020@gmail.com";

// To send a plain text email
multiMailer.SendGrid.sendTextEmail(
  RECEIVER_EMAIL,
  "Sending email from node-multi-mailer", // subject
  "Thanks for sending email with node-multi-mailer" // body
);
```

### A normal plain text email with attachments

```js

// index.js

var multiMailer = require("node-multi-mailer");
var path = require("path");

var attachmentFolder = path.join(__dirname, "attachment"); // attachment folder path

let attachments = ["myImage.png", "resume.pdf", "resume.docx"]; // pass list of files you want to send with multiMailer

// Create a new instance of MultiMailer
multiMailer.configuration({
  senderEmail: "you@example.com",
  senderName: "your business name", // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "me@example.com", // optional parameter [ default = senderEmail ]
  templateFolderPath: emailFolder, // optional parameter  [ required for sending templates ]
  attachmentFolderPath: attachmentFolder, // Optional parameter  [ required for sending attachments]
});

var RECEIVER_EMAIL = "developer.shiv2020@gmail.com";

// To send a plain text email
multiMailer.SendGrid.sendTextEmail(
  RECEIVER_EMAIL,
  "Sending email from node-multi-mailer", // subject
  "Thanks for sending email with node-multi-mailer" // body
  attachments,
);
```

### A template email using EJS without attachments

```js
// index.js

var multiMailer = require("node-multi-mailer");
var path = require("path");

var emailFolder = path.join(__dirname, "email"); // template folder path

// Create a new instance of MultiMailer
multiMailer.configuration({
  senderEmail: "test@example.com",
  senderName: SENDER_NAME, // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "test@example.com",
  templateFolderPath: emailFolder,
});

var RECEIVER_EMAIL = "developer.shiv2020@gmail.com";

var data = {
  fisrtName: "Shiv",
  lastName: "Kumar",
  otp: "123456",
};

// To send a template email
multiMailer.SendGrid.sendEjsTemplateWithData(
  RECEIVER_EMAIL,
  "Sending email from node-multi-mailer", // subject
  "login.ejs", // template name
  data // template data
);
```

### A template email using EJS with attachments

```js
// index.js

var multiMailer = require("node-multi-mailer");
var path = require("path");

var attachmentFolder = path.join(__dirname, "attachment"); // attachment folder path

var emailFolder = path.join(__dirname, "email"); // template folder path

let attachments = ["myImage.png", "resume.pdf", "resume.docx"]; // pass list of files you want to send with multiMailer

// Create a new instance of MultiMailer
multiMailer.configuration({
  senderEmail: "test@example.com",
  senderName: SENDER_NAME, // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "test@example.com",
  templateFolderPath: emailFolder,
  attachmentFolderPath: attachmentFolder,
});

var RECEIVER_EMAIL = "developer.shiv2020@gmail.com";

var data = {
  fisrtName: "Shiv",
  lastName: "Kumar",
  otp: "123456",
};

// To send a template email
multiMailer.SendGrid.sendEjsTemplateWithData(
  RECEIVER_EMAIL,
  "Sending email from node-multi-mailer", // subject
  "login.ejs", // template name
  data // template data
  attachments,
);
```

## Implementation with ExpressJs

### A template email using EJS without attachments

```js
// index.js

var express = require("express");
var multiMailer = require("node-multi-mailer");
var path = require("path");

var attachmentFolder = path.join(__dirname, "attachment"); // attachment folder path

var emailFolder = path.join(__dirname, "email"); // template folder path

let attachments = ["myImage.png", "resume.pdf", "resume.docx"]; // pass list of files you want to send with multiMailer

// Create a new instance of MultiMailer
multiMailer.configuration({
  senderEmail: "test@example.com",
  senderName: SENDER_NAME, // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "test@example.com",
  templateFolderPath: emailFolder,
  attachmentFolderPath: attachmentFolder,
});

var app = express();

app.get("/", async (req, res) => {

  var RECEIVER_EMAIL = "developer.shiv2020@gmail.com";

  var data = {
    fisrtName: "Shiv",
    lastName: "Kumar",
    otp: "123456",
  };

  // To send a template email
  await multiMailer.SendGrid.sendEjsTemplateWithData(
    RECEIVER_EMAIL,
    "Sending email from node-multi-mailer", // subject
    "login.ejs", // template name
    data // template data
    attachments,
  );

  return res.send("Email sent");
});
```

# Contributors

<a href = "https://github.com/shiv-source">
  <img 
    src = "https://avatars.githubusercontent.com/u/56552766?v=4" 
    width="100" 
    height="100"
    style="border-radius: 50%; margin: 5px;" 
  />
</a>

# License

[MIT](https://opensource.org/licenses/MIT)
