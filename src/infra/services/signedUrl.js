const aws = require('aws-sdk');
// const request = require('request-promise');
const s3 = new aws.S3(
  { signatureVersion: 'v4', region: process.env.AWS_S3_REGION}
);
const bucketName = process.env.AWS_S3_BUCKET;
const s3Region = process.env.AWS_S3_REGION;
// const baseURL = process.env.BUCKET_URL;
 

function generateSignedUrlForKeypoints(key){
  const params = {
    Bucket: bucketName,
    Key: key,
    ContentType: 'application/json',
    ACL: 'public-read-write',
    Expires: 604800,
  };

  const signedUrl = generateSignedUrl(params);
  const pathURL = `https://${bucketName}.s3.${s3Region}.amazonaws.com/${key}`;
  return  {
    signedUrl,
    pathURL
  };
}

function generateSignedUrlForVideo(key){
  const params = {
    Bucket: bucketName,
    Key: key,
    ContentType: 'video/mp4',
    ACL: 'public-read-write',
    Expires: 604800,
  };

  const signedUrl = generateSignedUrl(params);
  const pathURL = `https://${bucketName}.s3.${s3Region}.amazonaws.com/${key}`;
  return  {
    signedUrl,
    pathURL
  };
}

function generateSignedUrlForModel(key){
  const params = {
    Bucket: bucketName,
    Key: key,
    ContentType: 'application/octet-stream',
    ACL: 'public-read-write',
    Expires: 604800,
  };

  const signedUrl = generateSignedUrl(params);
  const pathURL = `https://${bucketName}.s3.${s3Region}.amazonaws.com/${key}`;
  return  {
    signedUrl,
    pathURL
  };
}



function generateSignedUrl(params){
  const signedUrl = s3.getSignedUrl('putObject', params);
  console.log('SIGNED URL', signedUrl);
  return signedUrl;
}

function fileUpload(userId, fileType, videoName){
  // name before = String(Date.now())
  const key = `videos/${process.env.NODE_ENV}/${new Date().toISOString().substr(0, 10)}/${userId}/${videoName}.${fileType}`;

  const params = {
    Bucket: bucketName,
    Key: key,
    ContentType: 'video/mp4',
    ACL: 'public-read-write',
    Expires: 604800,
  };

  const signedUrl = s3.getSignedUrl('putObject', params);
  return  {
    signedUrl,
    key,
    bucketName
  };
}


function keypointsUpload(clipId){
  const key = `keypoints/${process.env.NODE_ENV}/${new Date().toISOString().substr(0, 10)}/${clipId}/${String(Date.now())}.json`.replace(/\s/g, '');

  const params = {
    Bucket: bucketName,
    Key: key,
    ContentType: 'application/json',
    ACL: 'public-read-write',
    Expires: 604800,
  };

  const signedUrl = generateSignedUrl(params);
  return  {
    signedUrl,
    key,
    bucketName
  };
}

function generateKeypointsSignedUrl(clipId, detectPersonId){
  const key = `keypoints/${process.env.NODE_ENV}/${new Date().toISOString().substr(0, 10)}/${clipId}/${detectPersonId}/${String(Date.now())}.json`.replace(/\s/g, '');

  const params = {
    Bucket: bucketName,
    Key: key,
    ContentType: 'application/json',
    ACL: 'public-read-write',
    Expires: 604800,
  };

  const signedUrl = generateSignedUrl(params);
  return  {
    signedUrl,
    key,
    bucketName
  };
}

module.exports = {
  keypointsUpload,
  fileUpload,
  generateKeypointsSignedUrl,
  generateSignedUrlForVideo,
  generateSignedUrlForKeypoints,
  generateSignedUrlForModel
};

// function putObject(bitmap, key, params) {
//   const signedUrl = s3.getSignedUrl('putObject', params);
//   console.log('SIGNED_URL: ' + signedUrl);
//   return request({
//     uri: signedUrl,
//     method: 'PUT',
//     body: bitmap,
//     headers: {
//       'Content-Type': 'video/mp4',
//       'Content-Length': Buffer.byteLength(bitmap, 'utf8'),
//       // 'x-amz-acl': 'public-read',
//     },
//     followAllRedirects: true,
//     resolveWithFullResponse: true,
//   }).then(response => {
//     // console.log('error:', error); // Print the error if one occurred
//     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     // console.log('body:', body); // Print the HTML for the Google homepage.
//     console.log({
//       _s3_url: baseURL.concat(key),
//       _key: key,
//       _base: baseURL,
//     }
//     );
//     const resp = {
//       status: 200,
//       s3_url: baseURL.concat(key),
//       message: response,
//     };
//     return resp;
//   }).catch(error => {
//     console.log('S3_ERROR: ' + error);
//     const resp = {
//       status: 500,
//       message: error,
//     };
//     return resp;
//   });
// }
// module.exports.fileUpload = (userId, encodedFile) => {
//   const key = 'videos/' + process.env.NODE_ENV + '/' + new Date().toISOString().substr(0, 10) +
//     '/' + userId + '/' + String(Date.now()) + '.png';
//   console.log(key);
//   const videoType = encodedFile.split('/')[1].split(';')[0];
//   const videoFile = encodedFile.split(';')[1].split(',')[1];
//   let resp = {};
//   if (!videoType.match(/(mp4|mov|flv)/i)) {
//     resp = {
//       status: 500,
//       message: 'Invalid content type. gif, jpg, and png supported.',
//     };
//     return resp;
//   }
//   const params = {
//     Bucket: bucketName,
//     Key: key,
//     ContentType: 'video/mp4',
//     ACL: 'public-read',
//     Expires: 90,
//   };
//   // let signedUrl = '';
//   // return s3.getSignedUrl('putObject', params, (err, url) => {
//   // signedUrl = url;
//   const bitmap = new Buffer(videoFile, 'base64');
//   return putObject(bitmap, key, params).then(response => {
//     return response;
//   });
// };