const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');
const Score = require('src/domain/Score');

//select person
class GenerateDetectedPersonScore extends Operation {
  constructor({ PersonKeypointRepository, ThirdPartyApis, ScoreRepository, StandardModelRepository, ClipRepository }) {
    super();
    this.PersonKeypointRepository = PersonKeypointRepository;
    this.ScoreRepository = ScoreRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.StandardModelRepository = StandardModelRepository;
    this.ClipRepository = ClipRepository;
  }
 
  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    try {
      const modelLink = await this.StandardModelRepository.getModelLink(data.modelId);
      const jsonLink = await this.PersonKeypointRepository.getKeypointLink({'clipPersonId': 5});

      if(!jsonLink){
        /**
         * Must call keypoint generation
         */
        const clipParent = await this.ClipRepository.getClipParent(data.clip_id);
        const personKeypoints = await this.PersonKeypointRepository.upsert({
          scenarioId : null,
          clipPersonId : data.clip_person_id,
          userId : clipParent.video.userId,
        });
        this.emit(SUCCESS, personKeypoints);
        let response = this.ThirdPartyApis.callKeypointsExtraction(personKeypoints);
        return;
      }
            
      const message = 'Successfully selected for score generation.';

      let scoreParams = {
        ...data,
        model_path : modelLink,
        json_path : jsonLink
      };

      console.log('CALL SCORE GENERATION : ', scoreParams);
   
      /**
       * Get score from AI
       */
      let response = await this.ThirdPartyApis.callScoresGeneration(scoreParams);
      console.log('LOG SCORE GENERATION RESPONSE : ', response);

      /**
       * Save to score taable
       */
      const score = new Score({
        clipId : data.clip_id,
        standardId : id,
        testId : id,
        score : response.data.score
      });
      const newScore = await this.ScoreRepository.add(score);
      console.log('SAVED SCORE : ', newScore);
      
      return this.emit(SUCCESS, message);
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

GenerateDetectedPersonScore.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GenerateDetectedPersonScore;
