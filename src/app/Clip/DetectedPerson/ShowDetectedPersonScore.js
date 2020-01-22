const { Operation } = require('@amberjs/core');

class ShowDetectedPersonScore extends Operation {
  constructor({ThirdPartyApis, ScoreRepository }) {
    super();
    this.ScoreRepository = ScoreRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(params) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;
    try {
      let detectedPersonScores = await this.ScoreRepository.getAllWithParams(params);
      return this.emit(SUCCESS, {data:detectedPersonScores});
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
