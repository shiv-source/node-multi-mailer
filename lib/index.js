const config = require("./config");
const mailer = require("./sendEmail");

/***
 * Export default all APIs
 * @api public
 */

module.exports = {
  configuration: config.setData,
  sendEmail: mailer.sendEmail,
  sendTextEmail: mailer.sendTextEmail,
  sendHtmlEmail: mailer.sendHtmlEmail,
  sendEjsTemplateWithData : mailer.sendEjsTemplateWithData,
};
