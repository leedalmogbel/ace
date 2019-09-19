const { Operation } = require('@brewery/core');
const Video = require('src/domain/Video');
const Utils = require('src/interfaces/http/utils/utils.js');

class CreateVideo extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    const video = new Video(data);

    try {
      const message = 'Video Uploaded';
      const newVideo = await this.VideoRepository.add(video);
      const data = Utils().resSuccess(newVideo, message, this.eventNames());
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

CreateVideo.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateVideo;
