
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

  getAll(params) {
    return this.model.findAll({
      where: params,
      attributes: ['modelLink', 'keypointMap']
    });
  }
}

module.exports = StandardModelRepository;

