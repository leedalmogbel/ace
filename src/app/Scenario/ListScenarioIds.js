const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');


class ListScenarioIds extends Operation {
  constructor({ ScenarioRepository }) {
    super();
    this.ScenarioRepository = ScenarioRepository;
  }

  async execute(params) {
    const { SUCCESS, ERROR } = this.events;

    try {
      let idArr = await this.ScenarioRepository.getAll({
        attributes:['id'],
        where : params
      });
      
      
      const data = Utils().resSuccess(idArr);
      return this.emit(SUCCESS, data);
    } catch(error) {
      const dataError = Utils().resError(error);
      return this.emit(ERROR, dataError);
    }
  }
}

ListScenarioIds.setEvents(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = ListScenarioIds;
    
