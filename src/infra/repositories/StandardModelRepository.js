
const { BaseRepository } = require('@amberjs/core');
const reformatForListing = models => { 
  return models.map(model => {
    return {
      modelId: model.id,
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
      attributes: ['id'],
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
        scenarioId: data.scenarioId
      }
    }).then((standardModel) => {
      if(!standardModel){
        // create
        return this.model.create(data);
      }
      return standardModel;
    });

    return standardModelData;
  }
}

module.exports = StandardModelRepository;

