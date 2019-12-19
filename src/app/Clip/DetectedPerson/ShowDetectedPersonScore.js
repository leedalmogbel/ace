const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

//select person
class ShowDetectedPersonScore extends Operation {
  constructor({ ClipPersonRepository, ThirdPartyApis, ScoreRepository }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
    this.ScoreRepository = ScoreRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(clipId, selectedPersonId) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    try {
    //   data.status = 'forKeypointsGeneration';
      const detectedPersonScores = await this.ScoreRepository.getAllWithParams({'testId': selectedPersonId});
      let message = 'Successfully generated.'; // update detectedPerson Scores , add field to detected person or create new table for score
      // const scores = {
      //   'scores': (0.3243244, 0.6756756)
      // };
      if(detectedPersonScores){
        message = 'Not selected for';
      }
      const data = Utils().resSuccess(detectedPersonScores, message);
      return this.emit(SUCCESS, detectedPersonScores);
      // model link and keypoint link from detectedPerson
      //let response = this.ThirdPartyApis.callScoresGeneration(detectedPerson); 
      //return;
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

ShowDetectedPersonScore.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ShowDetectedPersonScore;
