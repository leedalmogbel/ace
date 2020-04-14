
const { BaseRepository } = require('@amberjs/core');

class VideoRepository extends BaseRepository {
  constructor({ VideoModel, ClipModel}) {
    super(VideoModel);
    this.ClipModel = ClipModel;
  }
  async getVideoById(id) {
    return this.model.findAll({
      where: {
        userId: id
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ],
      }
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

  async getByFilter(data) {
    var whereStatement = {};
    if (data.videoId) {
      whereStatement.videoId = data.videoId;
    }
    if (data.set) {
      whereStatement.set = data.set;
    }
    if (data.game) {
      whereStatement.game = data.game;
    }
    if (data.shotType) {
      whereStatement.shotType = data.shotType;
    }
    if (data.hitSpot) {
      whereStatement.hitSpot = data.hitSpot;
    }
    if (data.shotResult) {
      whereStatement.shotResult = data.shotResult;
    }
    if (data.errorType) {
      whereStatement.errorType = data.errorType;
    }
    if (data.shotDirection) {
      whereStatement.shotDirection = data.shotDirection;
    }
    return this.model.findAll({
      include: [{
        model: this.ClipModel,
        as: 'clips',
        where: whereStatement,
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ],
        }
      }],
      where: {
        id: data.videoId
      },
      attributes: [
        'videoName',
        'matchType',
        'location'
      ]
    });
  }

  getAllVideo(params){
    return this.model.findAll({
      where: {
        ...params
      },
      attributes : ['id', 'videoName', 'matchType']
    });
  }
}


module.exports = VideoRepository;

