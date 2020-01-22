const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');
const Score = require('src/domain/Score');

//select person
class GenerateDetectedPersonScore extends Operation {
  constructor({ PersonKeypointRepository, ThirdPartyApis, ScoreRepository, StandardModelRepository, ClipRepository, logger }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
    this.ScoreRepository = ScoreRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.StandardModelRepository = StandardModelRepository;
    this.ClipRepository = ClipRepository;
    this.logger = logger;
  }
 
  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR, SERVICE_UNAVAILABLE
    } = this.events;

    try {
      const modelLinks = await this.StandardModelRepository.getModelLinks({scenarioId:data.scenarioId});
      const jsonLink = await this.PersonKeypointRepository.getKeypointLink({clipPersonId: data.clip_person_id});
      
      if(jsonLink){
        let scoreParams = {
          ...data,
          model_path : modelLinks,
          json_path : jsonLink
        };
        this.logger.info(`GenerateDetectedPersonScore INFERENCE PARAMS : ${JSON.stringify(scoreParams)}`);

        //let response = await this.ThirdPartyApis.callScoresGeneration(scoreParams);
        let response = {data:{
          clipId: 38,
          clipPersonId: 3,
          score: [
            {
              keypointMap : 'all',
              score : 0.3456789
            },
            {
              keypointMap : 'balance',
              score : 0.3456789
            },
            {
              keypointMap : 'movement',
              score : 0.3456789
            },
            {
              keypointMap : 'ballStriking',
              score : 0.3456789
            }
          ]
        }};
        if(response.data.message == 'Busy'){
          return this.emit(SERVICE_UNAVAILABLE, {message:'Server is busy for inference. Try again later.'});
        }
        // insert data to score table or AI will call new API for saving score
         /**
       * Save to score taable
       * Parse array
       */
        let scoreArr = response.data.score;
        if(scoreArr){
          let resultArr= await Promise.all(
            scoreArr.map(score => {
              return this.ScoreRepository.add({
                ...score,
                clipId: response.data.clipId,
                clipPersonId: response.data.clipPersonId
              });
            })
          );

          return this.emit(SUCCESS, {data:resultArr});
          //return this.emit(SUCCESS, {message:"Submitted for Score Generation."});
        }
      }

      // SELECTED person have no generated keypoints yet
      console.log('SetDetectedPersonKeypoints DATA : ', data);
      const clipParent = await this.ClipRepository.getClipParent(data.clip_id);
      const personKeypoints = await this.PersonKeypointRepository.upsert({
          scenarioId : null,
          clipPersonId : data.clip_person_id,
          userId : clipParent.video.userId,
      });
      // GENERATE KEYPOINTS

      let extractionResponse = await this.ThirdPartyApis.callKeypointsExtraction(personKeypoints);
      console.log('SetDetectedPersonKeypoints RESPONSE : ', extractionResponse);
      if(extractionResponse.data.message == 'Busy'){
        this.PersonKeypointRepository.update(personKeypoints.person_keypoint_id, {status:'failed'});
        return this.emit(SERVICE_UNAVAILABLE, {message:'Server is busy for inference. Try again later.'});
      }

      this.emit(SUCCESS, {message:"Generating keypoints. Try again later."});
      return;

    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        return this.emit(ERROR, error);
      }
    }
  }
}

GenerateDetectedPersonScore.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND', 'SERVICE_UNAVAILABLE']);

module.exports = GenerateDetectedPersonScore;
