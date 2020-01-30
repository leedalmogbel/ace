const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');

class UpdateClip extends Operation {
  constructor({ ClipRepository, ThirdPartyApis }) {
    super();
    this.ClipRepository = ClipRepository;
    this.ThirdPartyApis = ThirdPartyApis;
  }

  async execute(id, data) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.events;

    try {
      const user = await this.ClipRepository.update(id, data);
      const message = 'Updated Successfully!';
      const updatedClip = Utils().resSuccess(user, message);
      this.emit(SUCCESS, updatedClip);

      // if(user.goldStandard){
      //   let dataForPersonDetection = await this.ClipRepository.getDataWithRelation(id);
      //   let response = this.ThirdPartyApis.callPersonDetection(dataForPersonDetection); 
      // }
      // return;

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
