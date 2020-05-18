const { Operation } = require('@amberjs/core');
class UpdateStatus extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute(id, params) {
    const { SUCCESS, NOT_FOUND, ERROR } = this.events;

    try {
      const videoData = await this.VideoRepository.update(id, params);
      return this.emit(SUCCESS, videoData);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
    
      return this.emit(ERROR, error);
    }
  }
}

UpdateStatus.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = UpdateStatus;
    
