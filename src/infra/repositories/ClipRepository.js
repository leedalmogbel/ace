
const { BaseRepository } = require('@amberjs/core');

const reformatForKeypoints = clips => {
  console.log('CLIPS DATA ', clips); 
  const newObj = {
    clip_id: clips.id,
    start: clips.startTime,
    video_path: clips.video.path
  };

  return newObj;
};

class ClipRepository extends BaseRepository {
  constructor({ ClipModel, VideoModel }) {
    super(ClipModel);
    this.VideoModel = VideoModel;
  }

  async createClip(data) {
    const clipData = this.model.create(data);
    return clipData;
  }

  async getClipAnalytics(id, set) {
    return this.model.findAll({
      where: {
        videoId: id,
        set: set
      },
      attributes: [
        'set',
        'game',
        'shotType',
        'hitSpot',
        'shotResult',
        'smartPattern',
        'extra',
        'errorType',
        'spin',
        'shotDirection',
        'speed'
      ]
    });
  }

  async getClips(id) {
    return this.model.findAll({
      where: {
        videoId: id
      },
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt'
        ]
      }
    });
  }

  async getDataWithRelation(id){
    const clips = await this._getById(id, {
      include: [
        {
          model: this.VideoModel,
          attributes: ['path'],
          as: 'video'
        },
      ]
    });

    return reformatForKeypoints(clips);
  }

  async updateStatus(id, data){
    const clips = await this._getById(id);
    await clips.update(data); 
    return this.getDataWithRelation(id);
  }
}

module.exports = ClipRepository;

