const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

//select person
class SetDetectedPersonKeypoints extends Operation {
  constructor({ ThirdPartyApis, PersonKeypointRepository }) {
    super();
    this.ThirdPartyApis = ThirdPartyApis;
    this.PersonKeypointRepository = PersonKeypointRepository;
  }

  async execute(data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    try {
      console.log('SetDetectedPersonKeypoints DATA : ', data);
      const personKeypoints = await this.PersonKeypointRepository.upsert(data);
      const message = 'Successfully selected for keypoints generation.';
      console.log('READY FOR EXTRACTION : ', personKeypoints);
      this.emit(SUCCESS, message);

      let response = await this.ThirdPartyApis.callKeypointsExtraction(personKeypoints);
      console.log('SetDetectedPersonKeypoints RESPONSE : ', response);
      if(response.data.message == 'Busy'){
        this.PersonKeypointRepository.update(personKeypoints.person_keypoint_id, {status:'failed'});
      }
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

SetDetectedPersonKeypoints.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = SetDetectedPersonKeypoints;
