
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

}

module.exports = StandardModelRepository;

