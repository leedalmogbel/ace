const { Operation } = require('@brewery/core');
const Clip = require('src/domain/Clip');

class CreateClip extends Operation {
  constructor({ ClipRepository}) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(data) {
    
    // Implement service/usecase logic here. eg:
      
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = this.events;
     
    const clip = new Clip(data);
    
    try {
      const newClip = await this.ClipRepository.add(clip);
    
      this.emit(SUCCESS, newClip);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateClip.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateClip;
