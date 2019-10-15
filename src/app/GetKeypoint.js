const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class GetKeypoint extends Operation {
  constructor({ KeypointRepository }) {
    super();
    this.KeypointRepository = KeypointRepository;
  }

  async execute(clipId) {
    const { SUCCESS, NOT_FOUND } = this.events;

    try {
      const keypoints = await this.KeypointRepository.getKeypoints(clipId);
      const data = Utils().resSuccess(keypoints);
      return this.emit(SUCCESS, data);
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetKeypoint.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = GetKeypoint;
