const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

class UpdateDetectedPerson extends Operation {
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
      const user = await this.ClipPersonRepository.update(id, data);
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

UpdateDetectedPerson.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = UpdateDetectedPerson;
