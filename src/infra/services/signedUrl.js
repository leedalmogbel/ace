const aws = require('aws-sdk');
const s3 = new aws.s3(
  {signatureVersion: 'v4'}
);

const bucketName = process.env.AWS_BUCKET_NAME;
const baseURL = process.env.BUCKET_URL;

