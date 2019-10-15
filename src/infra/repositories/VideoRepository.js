
const { BaseRepository } = require('@amberjs/core');

class VideoRepository extends BaseRepository {
  constructor({ VideoModel }) {
    super(VideoModel);
  }
  async getVideoById(id) {
    return this.model.findAll({
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

  async getVideoName(id) {
    return this.model.findAll({
      where: {
        id: id
      },
      attributes: [
        'videoName',
      ]
    });
  }
}

module.exports = VideoRepository;

