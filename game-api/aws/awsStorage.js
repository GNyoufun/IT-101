const pathResolve = require('node:path');
require('dotenv').config({ path: pathResolve.resolve(__dirname, '../../.env') });
const AWS = require('aws-sdk');
const fs = require('fs');
// import fileType from'file-type';
// import multer  from'multer';
// const upload = multer({ dest: 'uploads/' });

// window.Buffer = window.Buffer || require("buffer").Buffer;

const BUCKET_NAME = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_KEY
  
  
const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region:region
});


async function uploadAWS(files) {
  let urls = [];

  for(let imageName in files){
    let base64Image = files[imageName][1];
    let type = files[imageName][0];
    // let type = "image/jpeg";

    let uploaded = await upload(imageName, base64Image, type);
    urls.push(uploaded);
  }
  
  return urls;
};

/**
 * @description Uploads an image to S3
 * @param imageName Image name
 * @param base64Image Image body converted to base 64
 * @param type Image type
 * @return string S3 image URL or error accordingly
 */
async function upload(imageName, base64Image, type){
  const params = {
    Bucket: `${BUCKET_NAME}/Images`,
    Key: imageName,
    Body: new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
    ContentType: type
  };

  let data;

  try {
    data = await promiseUpload(params);
  } catch (err) {
    console.error(err);
    return "";
  }

  return data.Location;
}
/**
 * @description Promise an upload to S3
 * @param params S3 bucket params
 * @return data/err S3 response object
 */
function promiseUpload(params) {
  return new Promise(function (resolve, reject) {
      s3.upload(params, function (err, data) {
          if (err) {
              reject(err);
          } else {
              resolve(data);
          }
      });
  });
}

async function deleteAWS(files) {
  for(let i = 0; i < files.length; i++) {
    let fileName = "Images/" + files[i].split('/').at(-1);
    await s3.deleteObject({ 
      Bucket: `${BUCKET_NAME}`, 
      Key: fileName
    }, (err, data) => {
      if (err) {
          console.error(err);
      }
    });
  }
}

module.exports = {
  uploadAWS,
  deleteAWS
};

