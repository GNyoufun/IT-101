const pathResolve = require('node:path');
require('dotenv').config({ path: pathResolve.resolve(__dirname, '../../.env') });
const AWS = require('aws-sdk');
const fs = require('fs');
const crypto = require('crypto')

const bucket_name = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_KEY;
  
const s3 = new AWS.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region:region
});

/**
 * Upload sets of image to S3
 * @param {Object} files Collection of image files to upload
 * @returns A list of urls of uploaded images
 */
async function uploadAWS(files, user_id) {
  let urls = [];

  for(let imageName in files){
    let base64Image = files[imageName][1];
    let type = files[imageName][0];

    let uploaded = await upload(user_id, imageName, base64Image, type);
    urls.push(uploaded);
  }
  
  return urls;
};

/**
 * Uploads an image to S3
 * @param imageName Image name
 * @param base64Image Image body converted to base 64
 * @param type Image type
 * @return string S3 image URL or error accordingly
 */
async function upload(user_id, imageName, base64Image, type){
  const params = {
    Bucket: `${bucket_name}/Images/${user_id}`,
    Key: `${crypto.randomBytes(32).toString('hex')}.${imageName.split('.').at(-1)}`,
    Body: new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
    ContentType: type
  };
  console.log(params);

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
 * Promise an upload to S3
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

/**
 * Delete given url from S3
 * @param {List} urls A list of urls to be deleted 
 */
async function deleteAWS(urls) {
  for(let i = 0; i < urls.length; i++) {
    let pathName = urls[i].split("/").slice(-2);
    let fileName = `Images/${pathName[0]}/${pathName[1]}`;
    s3.deleteObject({
      Bucket: bucket_name,
      Key: fileName
    }, (err) => {
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

