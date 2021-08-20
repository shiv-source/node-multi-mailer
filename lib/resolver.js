var fs = require("fs");


function Resolver () {};


Resolver.prototype.getFilePath = async function ( folderPath , fileName ) {

    return  new Promise ( (resolve , reject ) => {

        fs.readdir(  folderPath , (err , files)  => {

            if(err) reject (err);

            if(files.length <= 0 ) { reject ( new Error ("No files found in this directory") ) }

            let result = files.find( (f) => f === fileName );

            if(result == undefined || null ) reject ( new Error ('File not exists in the selected directory'));
            
            else {
                const filePath = folderPath + '/' + result;
                return resolve (filePath)
            }

        });
    
    });

}

Resolver.prototype.getContentType = async function(fileName){

    let fileType = await fileName.split('.');
    let fileExt = fileType[1];

    let contentTypes = [
        {
            ext : ['png', 'jpg' , 'jpeg'],
            type : `image/${fileExt}`  
        },
        {
            ext : ['txt',],
            type : `text/plain`,  
        },
        {
            ext : ['pdf'],
            type : `application/pdf`,
        },
    ]

    let contentType = contentTypes.find(d => d.ext.find(e => e === fileExt));

    if(contentType == undefined ){ throw new Error (`${fileName} extension ${fileExt} is not a valid file format`) };
    
    return  {
        contentType,
        fileExt
    };
}


/**
 * @param {string} email - The email is the reciver email id.
 * @param {string} subject - The subject is the email subject for a particuar email.
 * @returns message
 */

Resolver.prototype.setMessage = async function(email , subject) {

    let message = {};
    let config = global.multiMailerConfig;
    message.from = `${config._senderName} <${config._senderEmail}>`;
    message.replyTo = config._replyTo;
    message.to = email;
    message.subject = subject;

    return message;
}

Resolver.prototype.getAttachments = async function (attachments , config ) {

    let attachmentFolderPath = config._attachmentFolderPath;
    if(attachmentFolderPath === undefined || '') { throw new Error("Attachment folder path is not set")};

    let newAttachments = [];

    for (file of attachments ){

        let filePath = await this.getFilePath(attachmentFolderPath, file );
        let fileType = await this.getContentType(file);

        let attach = {
            filename: file,
            type: fileType.contentType.type,
            content : await fs.readFileSync(filePath , { encoding : 'base64'}),
            disposition: 'attachment',
        }

        newAttachments.push(attach);
    }

    return newAttachments;
} 


module.exports = new Resolver();