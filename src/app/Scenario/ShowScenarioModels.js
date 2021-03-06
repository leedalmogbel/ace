const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ShowScenarioModels extends Operation {
  constructor({ StandardModelRepository }) {
    super();
    this.StandardModelRepository = StandardModelRepository;
  }

  async execute(scenarioId, params) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR } = this.events;
    if(isNaN(scenarioId)){
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : [{
            message : '"scenarioId" must be a number',
            path: 'id'
          }]
        }
      });
    }

    
    let parameters = {
        ...params,
        scenarioId : scenarioId
    };

    console.log(`SCENARIO ID : ${scenarioId} , PARAMS : ${JSON.stringify(parameters)}`);

    try {
      const scenarios = await this.StandardModelRepository.getOne(parameters);
     // if NULL either processing or none at all
      const data = Utils().resSuccess(scenarios);
      return this.emit(SUCCESS, data);
    } catch(error) {
      return this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

ShowScenarioModels.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ShowScenarioModels;
    
