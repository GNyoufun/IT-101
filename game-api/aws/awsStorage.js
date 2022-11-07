const pathResolve = require('node:path');
require('dotenv').config({ path: pathResolve.resolve(__dirname, '../../.env') });
const AWS = require('aws-sdk');
const fs = require('fs');
// import fileType from'file-type';
// import multer  from'multer';
// const upload = multer({ dest: 'uploads/' });

// window.Buffer = window.Buffer || require("buffer").Buffer;

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
    
    
const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region:region
});


async function uploadAWS(file) {
    let urls = [];
    // for(let i = 0; i < file.length; i++){
        const fileStream = fs.createReadStream(file.path);
    
        const params = {
            Bucket: bucketName,
            Key: file.originalname,
            Body: fileStream,
        };
    
        s3.upload(params, function (err, data) {
            console.log(data);
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            urls.push(data.Location);
        });
    // }
    return urls;
};

async function deleteAWS(file) {
    // deleteObjects
}

module.exports = {
    uploadAWS,
    deleteAWS
};