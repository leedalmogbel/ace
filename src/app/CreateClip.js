const { Operation } = require('@brewery/core');
const Clip = require('src/domain/Clip');
const Utils = require('src/interfaces/http/utils/utils.js');

class CreateClip extends Operation {
  constructor({ ClipRepository}) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(data) {
    
    // Implement service/usecase logic here. eg:
      
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;
     
    const clip = new Clip(data);
    
    try {
      const newClip = await this.ClipRepository.add(clip);
      const data = Utils().resSuccess(newClip);
      this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError);
      }
      this.emit(ERROR, dataError);
    }
  }
}

CreateClip.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateClip;
