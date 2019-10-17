
const { BaseRepository } = require('@brewery/core');

class AnalyticsRepository extends BaseRepository {
  constructor({ ClipModel, PlayerModel, VideoModel, TypeMatchModel }) {
    super();
    this.ClipModel = ClipModel;
    this.PlayerModel = PlayerModel;
    this.VideoModel = VideoModel;
    this.TypeMatchModel = TypeMatchModel;
  }

  async getVideoAnalytics(id, set) {
    this.ClipModel.findAll({
      where: {
        videoId: id,
        set: set,
      },
      attributes: [
        'set',
        'game',
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
}

module.exports = AnalyticsRepository;

