var fs = require("fs");


function Resolver () {};


/**
 * 
 * @param {string} folderPath - Folder path 
 * @param {string} fileName  - File name
 * @returns filePath
 */

Resolver.prototype.getFilePath = async function ( folderPath , fileName ) {
    
    let error = new Error ( `${folderPath} folder not exists`);

    if(folderPath == undefined) {
        throw error; 
    }
    let isExist = await this.isFolderExists(folderPath);
    
    if(!isExist){
        throw error;
    }
   
    return  new Promise ( (resolve , reject ) => {

        fs.readdir(  folderPath , (err , files)  => {
            if(err) reject (err);

            if(files.length <= 0 ) { 
                error.message = `${fileName} not found in ${folderPath} directory`;
                reject (error); 
            }

            let result = files.find( (f) => f === fileName );

            if(result == undefined || null ) {
                error.message = `${fileName} file is not exists in the selected directory ${folderPath}`;
                reject (error);
            }
            
            else {
                const filePath = folderPath + '/' + result;
                return resolve (filePath)
            }

        });
    
    });
}


/**
 * 
 * @param {string} folderPath - folderPath is the actual path of the targeted folder 
 * @returns boolean
 */
Resolver.prototype.isFolderExists = async function(folderPath) {

    return new Promise( (resolve) => {
        fs.exists( folderPath , (isExist) => {
           return resolve (isExist);
        }); 
    })
}


/**
 * 
 * @param {string} fileName - It is the actual name of file with extension
 * @returns contentType , fileExt
 */
Resolver.prototype.getContentType = async function(fileName){

    let fileType = await fileName.split('.');
    let fileExt = fileType[1];
    let contentType = `application/${fileExt}`;

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


/**
 * 
 * @param {Array.<string>} attachments 
 * @param {object} config 
 * @returns attachmentList
 */
Resolver.prototype.getAttachments = async function (attachments , config ) {

    let attachmentFolderPath = config._attachmentFolderPath;
    if(attachmentFolderPath === undefined || '') { 
        let error = new Error("Attachment folder path is not set");
        throw error;
    };

    let attachmentList = [];

    for (file of attachments ){

        let filePath = await this.getFilePath(attachmentFolderPath, file );
        let fileType = await this.getContentType(file);

        let attach = {
            filename: file,
            type: fileType.contentType,
            content : await fs.readFileSync(filePath , { encoding : 'base64'}),
            disposition: 'attachment',
        };

        attachmentList.push(attach);
    }

    return attachmentList;
} 


module.exports = new Resolver();