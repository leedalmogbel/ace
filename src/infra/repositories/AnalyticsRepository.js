
const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');

class AnalyticsRepository extends BaseRepository {
  constructor({ ClipModel, PlayerModel, VideoModel, TypeMatchModel }) {
    super();
    this.ClipModel = ClipModel;
    this.PlayerModel = PlayerModel;
    this.VideoModel = VideoModel;
    this.TypeMatchModel = TypeMatchModel;
  }
  async testCount(data) {
    var whereFilterStatement = {};
    if (data.videoId) {
      whereFilterStatement.videoId = data.videoId;
    }
    if (data.set) {
      whereFilterStatement.set = data.set;
    }
    return this.ClipModel.findAll({
      where: whereFilterStatement,
      attributes: [
          [sequelize.fn('sum', sequelize.cast({"shotType":"forehand"}, "integer")), 'forehand'],
          [sequelize.fn('sum', sequelize.cast({"shotType":"backhand"}, "integer")), 'backhand'],
          [sequelize.fn('sum', sequelize.cast({"shotType":"volley"}, "integer")), 'volley'],
          [sequelize.fn('sum', sequelize.cast({"shotType":"overhead"}, "integer")), 'overhead'],
          [sequelize.fn('sum', sequelize.cast({"shotResult":"ace"}, "integer")), 'ace'],
          [sequelize.fn('sum', sequelize.cast({"shotResult":"winner"}, "integer")), 'winner'],
          [sequelize.fn('sum', sequelize.cast({"shotResult":"double fault"}, "integer")), 'doubleFault'],
          [sequelize.fn('sum', sequelize.cast({"shotResult":"unforced error"}, "integer")), 'unforcedError'],
          [sequelize.fn('sum', sequelize.cast({"shotResult":"forced error"}, "integer")), 'forcedError'],
          [sequelize.fn('sum', sequelize.cast({"shotResult":"smartPattern"}, "integer")), 'smartPattern'],
          [sequelize.fn('sum', sequelize.cast({"shotResult":"others"}, "integer")), 'others'],
          [sequelize.fn('sum', sequelize.cast({"hitSpot":"behind baseline"}, "integer")), 'behindBaseline'],
          [sequelize.fn('sum', sequelize.cast({"hitSpot":"on baseline"}, "integer")), 'onBaseline'],
          [sequelize.fn('sum', sequelize.cast({"hitSpot":"inside baseline"}, "integer")), 'insideBaseline'],
          [sequelize.fn('sum', sequelize.cast({"hitSpot":"inside service line"}, "integer")), 'insideServiceLine'],
          [sequelize.fn('sum', sequelize.cast({"errorType":"into net"}, "integer")), 'intoNet'],
          [sequelize.fn('sum', sequelize.cast({"errorType":"wide"}, "integer")), 'wide'],
          [sequelize.fn('sum', sequelize.cast({"errorType":"long"}, "integer")), 'long'],
          [sequelize.fn('sum', sequelize.cast({"errorType":"NA"}, "integer")), 'NA'],
          [sequelize.fn('sum', sequelize.cast({"spin":"lob"}, "integer")), 'lob'],
          [sequelize.fn('sum', sequelize.cast({"spin":"topspin"}, "integer")), 'topspin'],
          [sequelize.fn('sum', sequelize.cast({"spin":"flat"}, "integer")), 'flat'],
          [sequelize.fn('sum', sequelize.cast({"spin":"underspin"}, "integer")), 'underspin'],
          [sequelize.fn('sum', sequelize.cast({"spin":"drop shot"}, "integer")), 'dropShot'],
          [sequelize.fn('sum', sequelize.cast({"shotDirection":"cross-court"}, "integer")), 'crossCourt'],
          [sequelize.fn('sum', sequelize.cast({"shotDirection":"down-the-line"}, "integer")), 'downTheLine'],
          [sequelize.fn('sum', sequelize.cast({"shotDirection":"inside-out"}, "integer")), 'insideOut'],
          [sequelize.fn('sum', sequelize.cast({"shotDirection":"inside-in"}, "integer")), 'insideIn'],
          [sequelize.fn('sum', sequelize.cast({"speed":"too hard"}, "integer")), 'tooHard'],
          [sequelize.fn('sum', sequelize.cast({"speed":"too soft"}, "integer")), 'tooSoft'],

        
        // [(, 'backhand')],
        // [this.ClipModel.sequelize.where(this.ClipModel.sequelize.col("filter"), 'backhand')], 
        // [this.ClipModel.sequelize.where(this.ClipModel.sequelize.col("shotType"), 'backhand')]
      ],
      raw: true
    })
    // .then(clips => {
    //   return clips.reduce((acc, {set, shotType, shotResult}) => {
    //     acc[`set${set}`].push({
    //       shotType,
    //       shotResult
    //     });
    //     return acc;
    //   }, {
    //     set1: [],
    //     set2: [],
    //     set3: []
    //   });
    // });
  } 

  async getCounts(id) {
    const counts = this.ClipModel.count({
      where: {
        videoId: id,
        // shotType: 'backhand'
      }
    });
    const findCount = this.ClipModel.findAndCountAll({
      where: {
        videoId: id,
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
    return {
      counts,
      findCount
    }
  }

  async getVideoAnalytics(id, set) {
    return this.ClipModel.findAll({
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

