
const { BaseRepository } = require('@amberjs/core');

class ClipRepository extends BaseRepository {
  constructor({ ClipModel }) {
    super(ClipModel);
  }

  async createClip(data) {
    const clipData = await this.model.create(data);
    return clipData;
  }

  async getClipAnalytics(id, set) {
    return await this.model.findAll({
      where: {
        videoId: id,
        set: set
      },
      attributes: [
        'set',
        'shotType',
        'hitSpot',
        'shotResult',
        'errorType',
        'spin',
        'shotDirection',
        'speed'
      ]
    });
  }

  async getClips(id) {
    return await this.model.findAll({
      where: {
        videoId: id
      },
      attributes: [
        'videoId',
        'clipName',
        'set',
        'game',
        'serveIn',
        'serveWon',
        'startTime',
        'endTime',
        'shotType',
        'moveDirection',
        'hitSpot',
        'shotResult',
        'errorType',
        'spin',
        'shotDirection',
        'speed'
      ]
    });
  }
}

module.exports = ClipRepository;

