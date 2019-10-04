const { Operation } = require('@amberjs/core');
const Utils = require('../infra/services/utils');
class ListVideo extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute(userId) {
    const { SUCCESS, NOT_FOUND } = this.events;

    try {
      console.log(userId);
      const video = await this.VideoRepository.getVideoById(userId);
      console.log(video);
      const data = Utils().resSuccess(video);
      this.emit(SUCCESS, data);
    } catch(error) {
      this.emit(NOT_FOUND, error);
    }
  }
}

ListVideo.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListVideo;
    
