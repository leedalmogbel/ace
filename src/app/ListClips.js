const { Operation } = require('@brewery/core');
const Utils = require('src/interfaces/http/utils/utils.js');

class ListClips extends Operation {
  constructor({ ClipRepository }) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(videoId) {
    const { SUCCESS, NOT_FOUND } = this.events;

    try {
      const clips = await this.ClipRepository.getClips(videoId);
      const data = Utils().resSuccess(clips);
      this.emit(SUCCESS, data);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ListClips.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListClips;
    
