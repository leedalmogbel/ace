
const { BaseRepository } = require('@amberjs/core');

class ClipRepository extends BaseRepository {
  constructor({ ClipModel }) {
    super(ClipModel);
  }

  async createClip(data) {
    const clipData = await this.model.create(data);
    return clipData;
  }

  async getClips(id) {
    const getVideoId = await this.model.findAll({
      where: {
        videoId: id
      },
      attributes: [
        'videoId',
        'clipName',
        'isGood',
        'set',
        'game',
        'serveIn',
        'serveWon',
        'startTime',
        'endTime'
      ]
    });

    return getVideoId;
  }
}

module.exports = ClipRepository;

