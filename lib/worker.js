var fs = require("fs");
var path = require("path");

var defaultTemplateDir = path.join( __dirname , '../../../email' );
var defaultAttachmentDir = path.join( __dirname , '../../../attachments');


fs.exists(defaultTemplateDir , (exists) => {
    if(exists){return }
    else { fs.mkdirSync(defaultTemplateDir , { recursive : true})};
}); 

fs.exists(defaultAttachmentDir , (exists) => {
    if(exists){return }
    else { fs.mkdirSync(defaultAttachmentDir , { recursive : true})};
});
