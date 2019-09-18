
const { BaseRepository } = require('@brewery/core');

class ClipRepository extends BaseRepository {
  constructor({ ClipModel }) {
    super(ClipModel);
  }

  async createClip(data) {
    const clipData = await this.model.create(data);
    return clipData;
  }
}

module.exports = ClipRepository;

