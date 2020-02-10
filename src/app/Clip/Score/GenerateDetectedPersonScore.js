const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');
const Score = require('src/domain/Score');

//select person
class GenerateDetectedPersonScore extends Operation {
  constructor({ PersonKeypointRepository, ThirdPartyApis, ScoreRepository, StandardModelRepository, ClipRepository, logger, FailedQueueRepository }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
    this.ScoreRepository = ScoreRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.StandardModelRepository = StandardModelRepository;
    this.ClipRepository = ClipRepository;
    this.logger = logger;
    this.FailedQueueRepository = FailedQueueRepository;
  }
 
  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR, SERVICE_UNAVAILABLE
    } = this.events;

    try {
      const modelLinks = await this.StandardModelRepository.getModelLinks({scenarioId:data.scenarioId});
      const jsonLink = await this.PersonKeypointRepository.getKeypointLink({clipPersonId: data.clipPersonId});
      
      if(jsonLink){
        let scoreParams = {
          scenario_id : data.scenarioId,
          clip_id : data.clipId,
          clip_person_id : data.clipPersonId,
          model_path : modelLinks,
          json_path : jsonLink
        };
        this.logger.info(`GenerateDetectedPersonScore INFERENCE PARAMS : ${JSON.stringify(scoreParams)}`);

        let response = await this.ThirdPartyApis.callScoresGeneration(scoreParams);
        if(response.data.message == 'Busy'){
          this.FailedQueueRepository.add({
            data: JSON.stringify(scoreParams),
            source: 'scoreGeneration',
          });
          return this.emit(SERVICE_UNAVAILABLE, {message:'Server is busy for inference. Try again later.'});
        }
        return this.emit(SUCCESS, {message:'Submitted for Score Generation.'});
      }

      // SELECTED person have no generated keypoints yet
      console.log('SetDetectedPersonKeypoints DATA : ', data);
      const clipParent = await this.ClipRepository.getClipParent(data.clipId);
      const personKeypoints = await this.PersonKeypointRepository.upsert({
        scenarioId : data.scenarioId,
        clipPersonId : data.clipPersonId,
        userId : clipParent.video.userId,
      });
      // GENERATE KEYPOINTS

      let extractionResponse = await this.ThirdPartyApis.callKeypointsExtraction(personKeypoints);
      // let extractionResponse = {data:{
      //   message:'Busy'
      // }}
      console.log('SetDetectedPersonKeypoints RESPONSE : ', extractionResponse);
      if(extractionResponse.data.message == 'Busy'){
        this.PersonKeypointRepository.update(personKeypoints.person_keypoint_id, {status:'failed'});
        this.FailedQueueRepository.add({
          data: JSON.stringify(personKeypoints),
          source: 'extraction',
        });
        return this.emit(SERVICE_UNAVAILABLE, {message:'Server is busy for inference. Try again later.'});
      }

      this.emit(SUCCESS, {details:{message:'Generating keypoints. Try again later.'}});
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
