
const { BaseRepository } = require('@brewery/core');

class VideoRepository extends BaseRepository {
  constructor({ VideoModel }) {
    super(VideoModel);
  }

  async get(userId) {
    // const userId = this._getById(id);
    entity.push(userId);
    this.VideoModel.add(entity);
  }

  
  
}

module.exports = VideoRepository;

