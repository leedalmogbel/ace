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
  const pathUrl = `https://${bucketName}.s3.${s3Region}.amazonaws.com/${key}`;
  return  {
    signedUrl,
    pathUrl
  };
}



function generateSignedUrl(params){
  const signedUrl = s3.getSignedUrl('putObject', params);
  console.log('SIGNED URL', signedUrl);
  return signedUrl;
}

/**
 * 
 * @param {*} userId 
 * @param {*} fileType 
 * @param {*} videoName 
 * Upload video
 */
function fileUpload(userId, fileType, videoName){
  // name before = String(Date.now())
  const key = `videos/${process.env.NODE_ENV}/${userId}/${new Date().toISOString().substr(0, 10)}/${videoName}.${fileType}`;

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

/**
 * keypoints per clip
 */
function keypointsUpload(clipId){
  const key = `keypoints/${process.env.NODE_ENV}/${clipId}/${new Date().toISOString().substr(0, 10)}/${String(Date.now())}.json`.replace(/\s/g, '');

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

/**
 * 
 * @param {*} clipId 
 * @param {*} detectPersonId 
 * keypoints per detectedPerson per clip
 */
function generateKeypointsSignedUrl(clipId, detectPersonId){
  const key = `keypoints/${process.env.NODE_ENV}/${clipId}/${detectPersonId}/${new Date().toISOString().substr(0, 10)}/${String(Date.now())}.json`.replace(/\s/g, '');

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
