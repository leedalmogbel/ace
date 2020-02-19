
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

class ScenarioRepository extends BaseRepository {
  constructor({ ScenariosModel, StandardModel }) {
    super(ScenariosModel);
    this.StandardModel = StandardModel;
  }
 //getAllWithScenario
  async getAllScenariosWithModel(params){
    return reformatForListing(await this.model.findAll({
      attributes: ['scenario', 'id'],
      include: [
        {
          model: this.StandardModel,
          attributes: ['id', 'modelLink'],
          where : params,
          as: 'standardModel',
        }
      ],
    }));
  }
}

module.exports = ScenarioRepository;

