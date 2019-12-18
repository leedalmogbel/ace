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
  callAiAsyncApi(params){
    try {
      axios.post('http://tennis-trainer-dl-nonprod-411157860.ap-southeast-1.elb.amazonaws.com/detect', params)
        .then(function (response) {
          console.log('AXIOS POST THEN :', response);
        })
        .catch(function (error) {
          console.log('AXIOS POST ERROR', error);
        });
      //axios.post('https://9fa0c81c.ngrok.io/detect', params);
      console.log('LOG after axios post.');
      return true;
    } catch (error) {
      console.log('ERROR LOG after axios post.');
      return false;
    }
  }

  callKeypointsGeneration(params){
    try {
      axios.post('http://tennis-trainer-dl-nonprod-411157860.ap-southeast-1.elb.amazonaws.com/extract', params)
        .then(function (response) {
          console.log('AXIOS POST THEN callKeypointsGeneration:', response);
        })
        .catch(function (error) {
          console.log('AXIOS POST ERRORcallKeypointsGeneration ', error);
        });
      //axios.post('https://9fa0c81c.ngrok.io/detect', params);
      console.log('LOG after axios post. callKeypointsGeneration');
      return true;
    } catch (error) {
      console.log('ERROR LOG after axios post. callKeypointsGeneration');
      return false;
    }
  }
};