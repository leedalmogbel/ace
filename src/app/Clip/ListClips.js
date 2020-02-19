const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ListClips extends Operation {
  constructor({ ClipRepository, logger }) {
    super();
    this.ClipRepository = ClipRepository;
    this.logger = logger;
  }

  async execute(videoId) {
    const { SUCCESS, NOT_FOUND } = this.events;
    try {
      const clips = await this.ClipRepository.getAll({
        where: {
          videoId: videoId
        },
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        }
      });
      this.logger.info(`ListClips; List of Clips based on videoID : ${JSON.stringify(clips)}`);
      const data = Utils().resSuccess(clips);
      return this.emit(SUCCESS, data);
    } catch(error) {
      this.logger.info(`ListClips; ERROR : ${JSON.stringify(error)}`);
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ListClips.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListClips;
    
