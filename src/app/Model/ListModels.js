const { Operation } = require('@amberjs/core');
const Utils = require('src/infra/services/utils.js');

class ListModels extends Operation {
  constructor({ StandardModelRepository, logger }) {
    super();
    this.StandardModelRepository = StandardModelRepository;
    this.logger = logger;
  }

  async execute(params) {
    const { SUCCESS, NOT_FOUND } = this.events;
    try {
      const models = await this.StandardModelRepository.getAllWithScenario(params);
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
    
