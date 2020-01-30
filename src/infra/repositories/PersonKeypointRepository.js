
const { BaseRepository } = require('@amberjs/core');
const reformatForKeypointsGeneration = personKeypoint => {
  const newObj = {
    person_keypoint_id: personKeypoint.id,
    clip_id: personKeypoint.clipPerson.clipId,
    clip_person_id: personKeypoint.clipPerson.id,
    centroid: personKeypoint.clipPerson.centroid,
    start: personKeypoint.clipPerson.clip.startTime,
    end: personKeypoint.clipPerson.clip.endTime,
    video_path: personKeypoint.clipPerson.clip.video.path
  };
    
  return newObj;
};


class PersonKeypointRepository extends BaseRepository {
  constructor({ PersonKeypointModel, ClipPersonModel, ClipModel, VideoModel }) {
    super(PersonKeypointModel);
    this.ClipPersonModel = ClipPersonModel;
    this.ClipModel = ClipModel;
    this.VideoModel = VideoModel;
  }
  async getAll(params){
    return this.model.findAll({
      where : params,
      attributes: ['id', 'scenarioId', 'keypointLink']
    });
  }

  async getAllKeypoints(param){
    return this.model.findAll({
      where : param,
      attributes: ['userId', 'scenarioId', 'keypointLink']
    }).map(personKeypointData => {
      return personKeypointData.keypointLink;
    });
  }

  async upsert(data) {
    // check if clipPersonId and scenarioId exist
    let personKeypointData = await this.model.findOne({
      where: {
        clipPersonId: data.clipPersonId,
        scenarioId: data.scenarioId
      }
    }).then((personKeypoint) => {
      if(!personKeypoint){
        // create
        return this.model.create(data);
      }
      return personKeypoint;
    });

    return reformatForKeypointsGeneration(await this.queryForExtraction(personKeypointData.id));
  }

  async queryForExtraction(id){
    return this._getById(id, {
      attributes: ['id', 'scenarioId'],
      include: [
        {
          model: this.ClipPersonModel,
          attributes: ['id', 'centroid', 'clipId'],
          as: 'clipPerson',
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
        },
      ]
    });
  }


  async getKeypointLink(param){
    let personKeypoint = await this.model.findOne({
      where: param
    });
    if(personKeypoint){
      return personKeypoint.keypointLink;
    }
    return false;
  }

}

module.exports = PersonKeypointRepository;

