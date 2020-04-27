const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');
const { GenerateScore } = require('src/domain/Score');

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
 
  async execute(params, body) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR, SERVICE_UNAVAILABLE
    } = this.events;

    let data = {
      ...body,
      clipPersonId : params.id,
      clipId : params.clipId,
    };
    
    
    console.log('Generate Detected Person Score DATA :', data);
    const generateScore = new GenerateScore(data);
    
    const { valid, errors } = generateScore.validate(data);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }
 
    try {
      const modelLinks = await this.StandardModelRepository.getModelLinks({scenarioId:data.scenarioId, userId:data.userId});
      const keypointUrl = await this.StandardModelRepository.getKeypointUrl({scenarioId:data.scenarioId, userId:data.userId});
      const jsonLink = await this.PersonKeypointRepository.getKeypointLink({clipPersonId: data.clipPersonId});
      
      console.log('KEYPOINT URL ', keypointUrl);
      

      if(jsonLink){
        let scoreParams = {
          scenario_id : data.scenarioId,
          clip_id : data.clipId,
          clip_person_id : data.clipPersonId,
          model_path : modelLinks,
          json_path : jsonLink.keypointLink,
          keypoint_url : keypointUrl.keypointUrl
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

      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : 'No Keypoints'
        }
      });

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
