const aws = require('aws-sdk');
const request = require('request-promise');
const s3 = new aws.S3(
  { signatureVersion: 'v4' }
);
const bucketName = process.env.AWS_S3_BUCKET;
const baseURL = process.env.BUCKET_URL;

function putObject(bitmap, key, params) {
  const signedUrl = s3.getSignedUrl('putObject', params);
  console.log('SIGNED_URL: ' + signedUrl);
  return request({
    uri: signedUrl,
    method: 'PUT',
    body: bitmap,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': Buffer.byteLength(bitmap, 'utf8'),
      // 'x-amz-acl': 'public-read',
    },
    followAllRedirects: true,
    resolveWithFullResponse: true,
  }).then(response => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    console.log({
      _s3_url: baseURL.concat(key),
      _key: key,
      _base: baseURL,
    }
    );
    const resp = {
      status: 200,
      s3_url: baseURL.concat(key),
      message: response,
    };
    return resp;
  }).catch(error => {
    console.log('S3_ERROR: ' + error);
    const resp = {
      status: 500,
      message: error,
    };
    return resp;
  });
}
export default function fileUpload(userId, encodedFile) {
  const key = 'videos/' + process.env.NODE_ENV + '/' + new Date().toISOString().substr(0, 10) +
    '/' + userId + '/' + String(Date.now()) + '.png';
  console.log(key);
  const videoType = encodedFile.split('/')[1].split(';')[0];
  const videoFile = encodedFile.split(';')[1].split(',')[1];
  let resp = {};
  if (!videoType.match(/(mp4|mov|flv)/i)) {
    resp = {
      status: 500,
      message: 'Invalid content type. gif, jpg, and png supported.',
    };
    return resp;
  }
  const params = {
    Bucket: bucketName,
    Key: key,
    ContentType: 'video/mp4',
    ACL: 'public-read',
    Expires: 90,
  };
  // let signedUrl = '';
  // return s3.getSignedUrl('putObject', params, (err, url) => {
  // signedUrl = url;
  const bitmap = new Buffer(videoFile, 'base64');
  return putObject(bitmap, key, params).then(response => {
    return response;
  });
}