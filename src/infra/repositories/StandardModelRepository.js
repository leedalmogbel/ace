
const { BaseRepository } = require('@amberjs/core');
const reformatForListing = models => { 
  return models.map(model => {
    return {
      modelId: model.id,
      modelLink: model.modelLink,
      scenario: model.scenario.scenario,
    };
  });
};

class StandardModelRepository extends BaseRepository {
  constructor({ StandardModel, ScenariosModel }) {
    super(StandardModel);
    this.ScenariosModel = ScenariosModel;
  }

  async getAllWithScenario(){
    return reformatForListing(await this.model.findAll({
      attributes: ['id', 'modelLink'],
      include: [
        {
          model: this.ScenariosModel,
          attributes: ['scenario'],
          as: 'scenario'
        },
      ]
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

  async getModelLink(id){
    const modelLink = await this._getById(id);
    return modelLink.modelLink;
  }
}

module.exports = StandardModelRepository;

