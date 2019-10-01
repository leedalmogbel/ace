
const { BaseRepository } = require('@amberjs/core');

class VideoRepository extends BaseRepository {
  constructor({ VideoModel }) {
    super(VideoModel);
  }
  
}

module.exports = VideoRepository;

