const { Operation } = require('@amberjs/core');
const UpdateClipValidator = require('src/domain/Clip').UpdateClip;
const Utils = require('src/infra/services/utils');

class UpdateClip extends Operation {
  constructor({ ClipRepository, ThirdPartyApis, sessionUser }) {
    super();
    this.ClipRepository = ClipRepository;
    this.ThirdPartyApis = ThirdPartyApis;
    this.sessionUser = sessionUser;
  }

  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    let params = {
      ...data,
      updatedBy: this.sessionUser.id // must updated based on logged user
    }
   
    const clipUpdates = new UpdateClipValidator(params);
    const { valid, errors } = clipUpdates.validate();
    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
      const clip = await this.ClipRepository.update(id, params).then( async(clipModel) => {
        let detectedPersons = await clipModel.getDetectedPerson();
        detectedPersons.map( personData => {
          personData.destroy();
        });
        return clipModel;
      });

      const message = 'Updated Successfully!';
      const updatedClip = Utils().resSuccess(clip, message);
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

UpdateClip.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = UpdateClip;
