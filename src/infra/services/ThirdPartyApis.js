const axios = require('axios');
// async function getDetectedPerson(params){
//   try {
//     const response = await axios.post('http://tennis-trainer-dl-nonprod-411157860.ap-southeast-1.elb.amazonaws.com/detect', params);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// getDetectedPerson({'clip_id': 46, 'start':5, 'video_path':"https://tennis-trainer-dev-media.s3.ap-southeast-1.amazonaws.com/videos/dev/2019-12-10/2019663293/Mandaluyong City_12102019_14:09.mp4"});
//process.env.AI_ENGINE_LINK
module.exports = class ThirdPartyApis {
  async callAiAsyncApi(apiLink, params){
    try {
      axios.post(apiLink, params);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};