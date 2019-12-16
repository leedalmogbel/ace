const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

class SetKeypoints extends Operation {
  constructor({ ClipPersonRepository }) {
    super();
    this.ClipPersonRepository = ClipPersonRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    try {
      data.status = 'forKeypointsGeneration';
      const user = await this.ClipPersonRepository.update(id, data);
      const message = 'Updated Successfully!';
      const updatedClip = Utils().resSuccess(user, message);
      // call AI Engine for keypoints generation
      return this.emit(SUCCESS, updatedClip);
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

SetKeypoints.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = SetKeypoints;
