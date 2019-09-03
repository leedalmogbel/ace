
const { BaseRepository } = require('@brewery/core');

class VideoRepository extends BaseRepository {
  constructor({ VideoModel }) {
    super(VideoModel);
  }
}

module.exports = VideoRepository;

