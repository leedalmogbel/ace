const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ListClips extends Operation {
  constructor({ ClipRepository }) {
    super();
    this.ClipRepository = ClipRepository;
  }

  async execute(videoId) {
    const { SUCCESS, NOT_FOUND } = this.events;
    console.log(videoId);
    try {
      const clips = await this.ClipRepository.getClips(videoId);
      console.log('line 15 test list', clips);
      const data = Utils().resSuccess(clips);
      return this.emit(SUCCESS, data);
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ListClips.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListClips;
    
