const { Operation } = require('@brewery/core');
const Video = require('src/domain/Video');

class CreateVideo extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const video = new Video(data);

    try {
      const newVideo = await this.VideoRepository.add(video);

      this.emit(SUCCESS, newVideo);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateVideo.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateVideo;
