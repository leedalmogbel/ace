const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');
const reformatForListing = models => { 
  return models.map(model => {
    if(model.standardModel.length > 0){
      let scenario = `${model.activity} ${model.subActivityOne} ${model.subActivityTwo} ${model.subActivityThree} ${model.subActivityFour} ${model.subActivityFive}`;
      return {
        scenario: scenario.trim(),
        scenarioId: model.id,
      };
    }
  });
};

class ListModels extends Operation {
  constructor({ ScenarioRepository, logger }) {
    super();
    this.ScenarioRepository = ScenarioRepository;
    this.logger = logger;
  }

  async execute(params) {
    const { SUCCESS, NOT_FOUND } = this.events;
    try {

      const models = reformatForListing(await this.ScenarioRepository.getAllScenariosWithModel(params));
      const data = Utils().resSuccess(models);
      return this.emit(SUCCESS, data);
    } catch(error) {
      console.log('MODEL LISTING ERROR : ', error);
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ListModels.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListModels;
    
