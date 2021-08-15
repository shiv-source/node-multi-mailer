# node-multi-mailer

![GitHub release](https://img.shields.io/github/release/shiv-source/node-multi-mailer)
[![License](https://img.shields.io/github/license/shiv-source/node-multi-mailer)](https://opensource.org/licenses/MIT)

A simple node.js module which expose high level API of [Nodemailer](https://www.npmjs.com/package/nodemailer) and [SendGrid](https://www.npmjs.com/package/@sendgrid/mail) .

# Installation

## Prerequisites

- Node.js >= 10.0.0
- A [Twilio SendGrid account](https://sendgrid.com/free?source=sendgrid-nodejs) for sending emails

## Obtain an API key from SendGrid

Grab your API key from the [Twilio SendGrid UI](https://app.sendgrid.com/settings/api_keys).

## Set up your environment variables

Do not hardcode your [Twilio SendGrid API Key](https://app.sendgrid.com/settings/api_keys) into your code. Instead, use an environment variable or some other secure means of protecting your Twilio SendGrid API Key. Following is an example of using an environment variable.

```bash
echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
```

## Install Package

The following recommended installation requires [npm](https://npmjs.org/). If you are unfamiliar with npm, see the [npm docs](https://npmjs.org/doc/). Npm comes installed with Node.js since node version 0.8.x, therefore, you likely already have it.

```sh
npm install --save node-multi-mailer
```

## Verify Sender Identity

Verify an email address or domain in the [Sender Authentication tab](https://app.sendgrid.com/settings/sender_auth/senders). Without this you will receive a `403 Forbidden` response when trying to send mail.

# Implementation with NodeJs

## A normal plain text email

```js
// index.js

var multiMailer = require("node-multi-mailer");

// Create a new instance of MultiMailer
multiMailer.configuration({
  senderEmail: "test@example.com",
  senderName: SENDER_NAME, // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "test@example.com",
});

var RECEIVER_EMAIL = "developer.shiv2020@gmail.com";

// To send a plain text email
multiMailer.sendTextEmail(
  RECEIVER_EMAIL,
  "Sending email from node-multi-mailer", // subject
  "Thanks for sending email with node-multi-mailer" // body
);
```

## A template email using EJS

Add a `email` folder in your project root directory and create a `login.ejs` file in the `email` folder. You can use any template name you want.

```
Folder structure:

    +-- email
    |   +-- login.ejs
    +-- node_modules
    +-- index.js
    +-- package.json
```

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

```js
// index.js

var multiMailer = require("node-multi-mailer");
var path = require("path");

// Create a new instance of MultiMailer
multiMailer.configuration({
  senderEmail: "test@example.com",
  senderName: SENDER_NAME, // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "test@example.com",
});

var emailFolder = path.join(__dirname, "email"); // path to email folder

var RECEIVER_EMAIL = "developer.shiv2020@gmail.com";

var data = {
  fisrtName: "Shiv",
  lastName: "Kumar",
  otp: "123456",
};

// To send a template email
multiMailer.sendEjsTemplateWithData(
  RECEIVER_EMAIL,
  "Sending email from node-multi-mailer", // subject
  "login.ejs", // template name
  data // template data
);
```

# Implementation with ExpressJs

## A template email using EJS

Add a `email` folder in your project root directory and create a `login.ejs` file in the `email` folder. You can use any template name you want.

```
Folder structure:

    +-- email
    |   +-- login.ejs
    +-- node_modules
    +-- index.js
    +-- package.json
```

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

```js
// index.js

var express = require("express");
var multiMailer = require("node-multi-mailer");
var path = require("path");

// Create a new instance of MultiMailer
multiMailer.configuration({
  senderEmail: "test@example.com",
  senderName: SENDER_NAME, // Business Name
  sendGridApiKey: SENDGRID_API_KEY, // SendGrid API Key
  replyTo: "test@example.com",
});

var emailFolder = path.join(__dirname, "email"); // path to email folder

var app = express();

app.get("/", async (req, res) => {
  var RECEIVER_EMAIL = "developer.shiv2020@gmail.com";

  var data = {
    fisrtName: "Shiv",
    lastName: "Kumar",
    otp: "123456",
  };

  // To send a template email
  await multiMailer.sendEjsTemplateWithData(
    RECEIVER_EMAIL,
    "Sending email from node-multi-mailer", // subject
    "login.ejs", // template name
    data // template data
  );

  return res.send(
    "Email sent to your template with the value bind with 'data' object"
  );
});
```

# Contributors

<a href = "https://github.com/shiv-source">
  <img src = "https://contrib.rocks/image?repo=shiv-source/node-multi-mailer"/>
</a>

# License

[MIT](https://opensource.org/licenses/MIT)