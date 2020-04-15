
const { BaseRepository } = require('@amberjs/core');

class StandardModelRepository extends BaseRepository {
  constructor({ StandardModel, ScenariosModel }) {
    super(StandardModel);
    this.ScenariosModel = ScenariosModel;
  }

  async upsert(data) {
    return await this.model.upsert(data);
  }

  async getModelLinks(params){
    const modelLinks = await this.model.findAll({
      attributes: ['keypointMap', 'modelLink'],
      where : params
    });
    return modelLinks;
  }

  getOne(params){
    return this.model.findOne({
      attributes: ['status'],
      where : params
    });
  }

  getKeypointUrl(params){
    return this.model.findOne({
      attributes: ['keypointUrl'],
      where : params
    });
  }

  update(status, params){
    return this.model.update(
      {
        status : status
      },
      {
        where : params
      });
  }


}

module.exports = StandardModelRepository;

