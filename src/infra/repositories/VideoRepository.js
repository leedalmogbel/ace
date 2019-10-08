
const { BaseRepository } = require('@amberjs/core');

class VideoRepository extends BaseRepository {
  constructor({ VideoModel }) {
    super(VideoModel);
  }
  async getVideoById(id) {
    return await this.model.findAll({
      where: {
        userId: id
      },
      attributes: [
        'id',
        'videoName',
        'path',
      ]
    });
  }
}

module.exports = VideoRepository;

