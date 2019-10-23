
const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');

class FilterRepository extends BaseRepository {
  constructor({ VideoModel, ClipModel }) {
    super();
    this.VideoModel = VideoModel;
    this.ClipModel = ClipModel;
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
    return this.VideoModel.findAll({
      include: [{
        model: this.ClipModel,
        AS: 'Clips',
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
}

module.exports = FilterRepository;

