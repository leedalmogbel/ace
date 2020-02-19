const { BaseRepository } = require('@amberjs/core');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const reformatForKeypointsGeneration = clipPerson => {
  const newObj = {
    clip_id: clipPerson.clipId,
    clip_person_id: clipPerson.id,
    centroid: clipPerson.centroid,
    start: clipPerson.clip.startTime,
    end: clipPerson.clip.endTime,
    video_path: clipPerson.clip.video.path
  };
  
  return newObj;
};


const reformatForScoreGeneration = clipPerson => {
  const newObj = {
    clip_id: clipPerson.clipId,
    clip_person_id: clipPerson.id,
    model_path: clipPerson.modelLink,
    json_path: clipPerson.keyPointLink
  };
  
  return newObj;
};

class ClipPersonRepository extends BaseRepository {
  constructor({ ClipPersonModel, VideoModel, ClipModel }) {
    super(ClipPersonModel);
    this.VideoModel = VideoModel;
    this.ClipModel = ClipModel;
  }

  async addMultiple(data) {
    return await this.model.bulkCreate(data.personImages);
  }

  async updateStatus(id, data){
    const clipPerson = await this._getById(id);
    await clipPerson.update(data); 
    const formattedData = this.getDataForKeypointsGeneration(id);
    return formattedData;
  }

  async getDataForKeypointsGeneration(id) {
    const clipPerson = await this._getById(id, {
      attributes: ['id', 'clipId', 'centroid'],
      include: [
        {
          model: this.ClipModel,
          attributes: ['startTime', 'endTime'],
          as: 'clip',
          include: [
            {
              model: this.VideoModel,
              attributes: ['path'],
              as: 'video'
            },
          ]
        },
      ]
    });
    return reformatForKeypointsGeneration(clipPerson);
  }

  async getDataForVideoGeneration(id) {
    const clipPerson = await this._getById(id, {
      attributes: ['id', 'centroid'],
      include: [
        {
          model: this.ClipModel,
          attributes: ['startTime', 'endTime'],
          as: 'clip',
          include: [
            {
              model: this.VideoModel,
              attributes: ['path'],
              as: 'video'
            },
          ]
        },
      ]
    });
    return reformatForKeypointsGeneration(clipPerson);
  }

  async getDataForScoreGeneration(id){
    const clipPerson = await this._getById(id);
    return reformatForScoreGeneration(clipPerson);
  }

}

module.exports = ClipPersonRepository;

