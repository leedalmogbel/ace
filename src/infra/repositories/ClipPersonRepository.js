
const { BaseRepository } = require('@amberjs/core');

const reformatForKeypointsGeneration = clipPerson => {
  const newObj = {
    clip_person_id: clipPerson.id,
    centroid: clipPerson.centroid,
    start: clipPerson.clip.startTime,
    end: clipPerson.clip.endTime,
    video_path: clipPerson.clip.video.path
  };
  
  return newObj;
};

class ClipPersonRepository extends BaseRepository {
  constructor({ ClipPersonModel, VideoModel, ClipModel }) {
    super(ClipPersonModel);
    this.VideoModel = VideoModel;
    this.ClipModel = ClipModel;
  }

  async addMultiple(clipId, data) {
    let promises = [];
    promises.push(
      Promise.all(
        data.personImages.map(person => {
          return this.model.create(person);
        })
      )
    );

    await Promise.all(promises);

    let clipPersons = await this.getAllWithParams({'clipId':clipId});

    return clipPersons;
  }

  async getAllWithParams(params){

    if(params){
      return await this.model.findAll({
        where: params
      });
    }
    
    return await this.model.findAll();
  }

  async updateStatus(id, data){
    const clipPerson = await this._getById(id);
    await clipPerson.update(data); 
    const formattedData = this.getDataForKeypointsGeneration(id);
    return formattedData;
  }

  async getDataForKeypointsGeneration(id) {
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

}

module.exports = ClipPersonRepository;

