const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ListScenarios extends Operation {
  constructor({ ScenarioRepository }) {
    super();
    this.ScenarioRepository = ScenarioRepository;
  }

  async execute(params) {
    const { SUCCESS, ERROR } = this.events;

    try {
      // add params to display only users scenario list
      const users = await this.ScenarioRepository.getAllScenariosAndModel(params);
      const data = Utils().resSuccess(users);
      return this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      return this.emit(ERROR, dataError);
    }
  }
}

ListScenarios.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListScenarios;
    
