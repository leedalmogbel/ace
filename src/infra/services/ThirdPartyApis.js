const axios = require('axios');
// async function getDetectedPerson(apiLink, params){
//   try {
//     const response = await axios.post(apiLink, params);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// getDetectedPerson('https://9fa0c81c.ngrok.io/detect', {"clip_id": 58, "start":5, "video_path":"https://tennis-trainer-dev-media.s3.ap-southeast-1.amazonaws.com/videos/dev/2019-12-06/2019663293/Mandaluyong City_12062019_14:24.mp4"});
//process.env.AI_ENGINE_LINK
module.exports = class ThirdPartyApis {
  /* 
    Will generate detected persons from video
  */
  callPersonDetection(params){
    return axios.post('http://ip-10-64-69-87.ap-southeast-1.compute.internal:6000/detect', params);
  }

  /* 
    Will generate keypoints and skeleton mp4
  */
  callKeypointsExtraction(params){
    return axios.post('http://ip-10-64-69-87.ap-southeast-1.compute.internal:6000/extract', params);
  }

  callScoresGeneration(params){
    return axios.post('http://ip-10-64-69-87.ap-southeast-1.compute.internal:6000/predict', params);
  }
};