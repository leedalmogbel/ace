const { Operation } = require('@amberjs/core');
const Scenario = require('src/domain/Scenario');
const Utils = require('src/infra/services/utils.js');

class CreateScenario extends Operation {
  constructor({ ScenarioRepository }) {
    super();
    this.ScenarioRepository = ScenarioRepository;
  }

  async execute(data) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.events;

    data.scenario = data.scenario.trim();
    const scenario = new Scenario(data);
    
    const { valid, errors } = scenario.validate(data);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, {
        details: {
          errors : errors
        }
      });
    }

    try {
      const newVideo = await this.ScenarioRepository.add(scenario);
      const data = Utils().resSuccess(newVideo, 'Gold scenario added.');
      return this.emit(SUCCESS, data);
    } catch(error) {
      if(error.name == 'SequelizeUniqueConstraintError')
        return this.emit(VALIDATION_ERROR, {
          details : {
            errors : [
              {
                message : 'Scenario name already exists.',
                path : 'scenario'
              }
            ]
          }
        });
      const dataError = Utils().resError(error);
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, dataError);
      }

      return this.emit(ERROR, dataError);
    }
  }
}

CreateScenario.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = CreateScenario;
