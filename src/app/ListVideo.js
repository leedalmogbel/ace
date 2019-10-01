const { Operation } = require('@amberjs/core');

class ListVideo extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.events;

    try {
      const video = await this.VideoRepository.getAll({});

      this.emit(SUCCESS, video);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

ListVideo.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListVideo;
    
