const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

class SetDetectedPersonKeypoints extends Operation {
  constructor({ ClipPersonRepository, ThirdPartyApis }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    try {
      data.status = 'forKeypointsGeneration';
      const detectedPerson = await this.ClipPersonRepository.updateStatus(id, data);
      const message = 'Successfully selected for keypoints generation.';
      //this.ThirdPartyApis.callKeypointsGeneration(detectedPerson); // enable after discussion with AI
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

SetDetectedPersonKeypoints.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = SetDetectedPersonKeypoints;
