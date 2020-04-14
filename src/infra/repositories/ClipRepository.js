
const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;


class ClipRepository extends BaseRepository {
  constructor({ ClipModel, VideoModel }) {
    super(ClipModel);
    this.VideoModel = VideoModel;
  }

  async createClip(data) {
    const clipData = this.model.create(data);
    return clipData;
  }

  async getClipParent(id) {
    return await this._getById(id, {
      include: [
        {
          model: this.VideoModel,
          attributes: ['userId', 'videoName'],
          as: 'video'
        },
      ]
    });
  }

  getDataWithRelation(id){
    return this._getById(id, {
      include: [
        {
          model: this.VideoModel,
          attributes: ['path'],
          as: 'video'
        },
      ]
    });
  }

  async updateStatus(id, data){
    const clips = await this._getById(id);
    await clips.update(data); 
    return this.getDataWithRelation(id);
  }

  getUniqueMoveTotalCount(videoId){
    return this.model.findAll({
      where: {
        videoId: videoId,
        move: {
          [Op.ne]: ''
        }
      },
      attributes: [
        'move',
        [sequelize.literal('COUNT("move")'), 'totalCount'],
        [sequelize.literal('COUNT("move") FILTER (WHERE winner = \'yes\')'), 'totalWinCount'],
      ],
      group: ['ClipModel.move']
    })
  }

  getUniqueShotResultTotalCount(params){
    return this.model.findAll({
      where: {
        ...params, 
        shotResult: {
          [Op.ne]: ''
        }
      },
      attributes: [
        ['shotResult', 'name'],
        [sequelize.literal('COUNT("shotResult")'), 'total']
      ],
      group: ['ClipModel.shotResult']
    });
  }

}

module.exports = ClipRepository;

