
const { BaseRepository } = require('@amberjs/core');

class ClipRepository extends BaseRepository {
  constructor({ ClipModel }) {
    super(ClipModel);
  }

  async createClip(data) {
    const clipData = this.model.create(data);
    return clipData;
  }

  async getClipAnalytics(id, set) {
    return this.model.findAll({
      where: {
        videoId: id,
        set: set
      },
      attributes: [
        'set',
        'game',
        'shotType',
        'hitSpot',
        'shotResult',
        'smartPattern',
        'extra',
        'errorType',
        'spin',
        'shotDirection',
        'speed'
      ]
    });
  }

  async getClips(id) {
    return this.model.findAll({
      where: {
        videoId: id
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ]
      }
    });
  }
}

module.exports = ClipRepository;

