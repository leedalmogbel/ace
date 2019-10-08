
const { BaseRepository } = require('@amberjs/core');

class KeypointRepository extends BaseRepository {
  constructor({ MoveKeypointModel }) {
    super(MoveKeypointModel);
  }
  async createKeypoint(data) {
    const keypointData = await this.model.create(data);
    return keypointData;
  }

  async getKeypoints(id) {
    return await this.model.findAll({
      where: {
        clipId: id
      },
      attributes: [
        'clipId',
        'clipPath'
      ]
    });
  }
}

module.exports = KeypointRepository;

