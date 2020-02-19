const axios = require('axios');
module.exports = class ThirdPartyApis {
  /* 
    Will generate detected persons from video
  */
  callPersonDetection(params){
    params.debug = process.env.AI_ENGINE_DEBUG;
    return axios.post(`${process.env.AI_ENGINE_LINK}/detect`, params);
  }

  /* 
    Will generate keypoints and skeleton mp4
  */
  callKeypointsExtraction(params){
    params.train_directly = false;
    params.debug = process.env.AI_ENGINE_DEBUG;
    console.log('ThirdPartyAPIS callKeypointsExtraction :', params);
    return axios.post(`${process.env.AI_ENGINE_LINK}/extract`, params);
  }

  callScoresGeneration(params){
    params.debug = process.env.AI_ENGINE_DEBUG;
    console.log('ThirdPartyAPIS callScoresGeneration :', params);
    return axios.post(`${process.env.AI_ENGINE_LINK}/predict`, params);
  }

  callModelTraining(params){
    params.debug = process.env.AI_ENGINE_DEBUG;
    console.log('ThirdPartyAPIS callModelTraining :', params);
    return axios.post(`${process.env.AI_ENGINE_LINK}/train`, params);
  }
};