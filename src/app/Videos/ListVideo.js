const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils');
class ListVideo extends Operation {
  constructor({ VideoRepository }) {
    super();
    this.VideoRepository = VideoRepository;
  }

  async execute(userId) {
    const { SUCCESS, NOT_FOUND } = this.events;

    try {
      const video = await this.VideoRepository.getVideoById(userId);
      const data = Utils().resSuccess(video);
      return this.emit(SUCCESS, data);
    } catch(error) {
      return this.emit(NOT_FOUND, error);
    }
  }
}

ListVideo.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListVideo;
    
