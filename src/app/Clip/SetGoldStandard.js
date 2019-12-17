const { Operation } = require('@amberjs/core');
const {SetStandard} = require('src/domain/Clip');
const Utils = require('src/infra/services/utils');

class SetGoldStandard extends Operation {
  constructor({ ClipRepository, ThirdPartyApis }) {
    super();
    this.ClipRepository = ClipRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    const standards = new SetStandard({...data});

    const { valid, errors } = standards.validate(data);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
      const clip = await this.ClipRepository.updateStatus(id, data);
      const message = 'Updated Successfully!';
      const updatedClip = Utils().resSuccess(clip, message);
      const callAiApis = this.ThirdPartyApis.callAiAsyncApi(process.env.AI_ENGINE_LINK, clip); // check if on queue
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

SetGoldStandard.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = SetGoldStandard;
