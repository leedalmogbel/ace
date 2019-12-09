const { Operation } = require('@amberjs/core');
const Utils = require('../infra/services/utils');

class SetGoldStandard extends Operation {
  constructor({ ClipRepository }) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    if(data.goldStandard === ''){
      return this.emit(VALIDATION_ERROR, 'Set gold Standard value.');
    }

    try {
      const user = await this.ClipRepository.update(id, data);
      const message = 'Updated Successfully!';
      const updatedClip = Utils().resSuccess(user, message);
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

SetGoldStandard.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = SetGoldStandard;
