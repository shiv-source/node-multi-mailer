const fs = require("fs");


function PathResolver() {};


PathResolver.prototype.getPath = async function( templateFolderPath , fileName) {

    return  new Promise ( (resolve , reject ) => {

        fs.readdir(  templateFolderPath , (err , files)  => {

            if(err) reject (err);

            if(files.length <= 0 ) { reject ( new Error ("No files found in this directory") ) }

            let result = files.find( (f) => f === fileName );

            if(result == undefined || null ) reject ( new Error ('File not exists in the selected directory'));
            
            else {
                const filePath = templateFolderPath + '/' + result;
                return resolve (filePath)
            }

        });
    });
      
}


module.exports = new PathResolver();