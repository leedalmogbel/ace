
const { BaseRepository } = require('@amberjs/core');

const reformatForListing = models => { 
  return models.map(model => {
    if(model.standardModel.length > 0){
      return {
        scenario: model.scenario,
        scenarioId: model.id,
      };
    }
  });
};

class StandardModelRepository extends BaseRepository {
  constructor({ StandardModel, ScenariosModel }) {
    super(StandardModel);
    this.ScenariosModel = ScenariosModel;
  }

  async getAllWithScenario(params){
    return reformatForListing(await this.ScenariosModel.findAll({
      attributes: ['scenario', 'id'],
      include: [
        {
          model: this.model,
          attributes: ['id', 'modelLink'],
          where : params,
          as: 'standardModel',
        }
      ],
    }));
  }

  async upsert(data) {
    // check if userId and scenarioId exist
    let standardModelData = await this.model.findOne({
      where: {
        userId: data.userId,
        scenarioId: data.scenarioId,
        keypointMap: data.keypointMap
      }
    }).then((standardModel) => {
      if(!standardModel){
        // create
        return this.model.create(data);
      }else{
        return this.model.update(data, {
          where: { id: standardModel.id },
          returning: true,
        // plain: true,
        });
      }
    });

    return standardModelData;
  }

  async getModelLinks(params){
    const modelLinks = await this.model.findAll({
      attributes: ['keypointMap', 'modelLink'],
      where : params
    });
    return modelLinks;
  }
}

module.exports = StandardModelRepository;

