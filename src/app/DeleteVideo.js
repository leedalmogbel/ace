const { Operation } = require('@amberjs/core');

class DeleteVideo extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute(id) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.events;

    try {
      await this.VideoRepository.remove(id);
      const message = {
        message: 'Clip DELETED'
      };
      this.emit(SUCCESS, message);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteVideo.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = DeleteVideo;
