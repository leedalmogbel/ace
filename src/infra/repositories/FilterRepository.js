
const { BaseRepository } = require('@amberjs/core');

class FilterRepository extends BaseRepository {
  constructor({ VideoModel, ClipModel }) {
    super(VideoModel);
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
    if (data.serveIn) {
      whereStatement.serveIn = data.serveIn;
    }
    if (data.serveWon) {
      whereStatement.serveWon = data.serveWon;
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
    return this.model.findOne({
      include: [{
        model: this.ClipModel,
        AS: 'Clips',
        where: whereStatement,
        attributes: [
          'clipName',
          'set',
          'game',
          'serveIn',
          'serveWon',
          'startTime',
          'endTime',
          'currentSetScore',
          'currentGameScore',
          'shotType',
          'moveDirection',
          'hitSpot',
          'shotResult',
          'errorType',
          'spin',
          'shotDirection',
          'speed',
        ]
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

